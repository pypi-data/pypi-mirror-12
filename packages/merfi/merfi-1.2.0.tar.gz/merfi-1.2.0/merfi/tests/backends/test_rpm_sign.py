from merfi.backends import rpm_sign
from merfi.tests.util import CallRecorder
from filecmp import cmp
import os
import pytest
from tambo import Transport

@pytest.fixture
def rpmsign(request):
    backend = rpm_sign.RpmSign([])
    backend.detached = CallRecorder()
    backend.clear_sign = CallRecorder()
    return backend

class RpmSign(object):

    def setup(self):
        self.backend = rpm_sign.RpmSign([])
        self.backend.detached = CallRecorder()
        self.backend.clear_sign = CallRecorder()
        # fake command-line args
        self.argv = ['merfi', '--key', 'mykey']
        self.backend.parser = Transport(
            self.argv, options=self.backend.options
        )
        self.backend.parser.parse_args()

        # args to merfi.backends.rpm_sign.util's run()
        self.detached = [
            'rpm-sign', '--key', 'mykey', '--detachsign',
            'Release', '--output', 'Release.gpg']
        # args to merfi.backends.rpm_sign.util's run_output()
        self.clearsign = [
            'rpm-sign', '--key', 'mykey',
            '--clearsign', 'Release']

    def sign(self, directory):
        self.backend.path = directory
        self.backend.sign()


class TestRpmSign(RpmSign):

    def test_sign_no_files(self, tmpdir):
        self.sign(str(tmpdir))
        assert self.backend.detached.calls == []
        assert self.backend.clear_sign.calls == []

    def test_sign_two_files_detached_and_clearsign(self, repotree):
        self.sign(repotree)
        assert len(self.backend.detached.calls) == 2
        assert len(self.backend.clear_sign.calls) == 2

    def test_sign_two_files_path(self, repotree):
        self.sign(repotree)
        assert self.backend.detached.calls[0][0][0] == self.detached
        assert self.backend.detached.calls[1][0][0] == self.detached

    def test_sign_two_files_command(self, repotree):
        self.sign(repotree)
        assert self.backend.detached.calls[0][0][0] == self.detached
        assert self.backend.detached.calls[1][0][0] == self.detached


class TestRpmClearSign(RpmSign):

    def test_sign_two_files_command(self, repotree):
        self.sign(repotree)
        # first call, second argument (the command to run)
        assert self.backend.clear_sign.calls[0][0][1] == self.clearsign
        # second call, second argument (the command to run)
        assert self.backend.clear_sign.calls[1][0][1] == self.clearsign

    def test_sign_two_files_path(self, repotree):
        self.sign(repotree)
        first_path = self.backend.clear_sign.calls[0][0][0]
        second_path = self.backend.clear_sign.calls[1][0][0]
        assert first_path.endswith('/Release')
        assert second_path.endswith('/Release')

class TestRpmSignKeyfile(RpmSign):

    def test_keyfile_path(self, repotree, rpmsign, tmpdir):
        backend = rpmsign
        # fake keyfile
        keyfile = tmpdir.join('RPM-GPG-KEY-testing')
        keyfile.write('-----BEGIN PGP PUBLIC KEY BLOCK-----')
        # fake command-line args
        argv = ['merfi', '--key', 'mykey', '--keyfile', str(keyfile)]
        backend.parser = Transport(argv, options=backend.options)
        backend.parser.parse_args()
        backend.path = repotree
        backend.sign()

        release_key = os.path.join(repotree, 'release.asc')
        assert cmp(str(keyfile), release_key)

class TestRpmSignNat(RpmSign):

    def test_keyfile_path(self, repotree, rpmsign):
        backend = rpmsign
        # fake command-line args
        argv = ['merfi', '--key', 'mykey', '--nat']
        backend.parser = Transport(argv, options=backend.options)
        backend.parser.parse_args()
        backend.path = repotree
        backend.sign()

        clearsign = ['rpm-sign', '--nat', '--key', 'mykey', '--clearsign', 'Release']

        # first call, second argument (the command to run)
        assert backend.clear_sign.calls[0][0][1] == clearsign
        # second call, second argument (the command to run)
        assert backend.clear_sign.calls[1][0][1] == clearsign
