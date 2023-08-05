from server_check import ftp
from server_check import exceptions
from mock import patch
import sys
import ftplib
import pytest


def test_00_test_ftp(domain):
    with patch('ftplib.FTP'):
        assert "Able to log in, upload, download and remove testfile via FTP." in \
            ftp.test_ftp(domain.user, domain.domain, domain.password, False)

    if sys.version_info[0] > 2 or (sys.version_info[0] == 2 and sys.version_info[1] > 6):
        with patch('ftplib.FTP_TLS'):
            assert "Able to log in, upload, download and remove testfile via FTP_SSL." in \
                ftp.test_ftp(domain.user, domain.domain, domain.password, True)


@patch('ftplib.FTP')
def test_01_test_ftp(mockftp, domain):
    mockftp.return_value.login.side_effect = ftplib.error_perm

    with pytest.raises(exceptions.TestException) as err:
        ftp.test_ftp(domain.user, domain.domain, domain.password)
    assert 'Permanent error while trying to log in.' in err.value.message


def test_02_download_handler():
    assert ftp.download_handler("this is a test")

    with pytest.raises(exceptions.TestException) as err:
        ftp.download_handler("this is not a test")
    assert 'Line not expected' in err.value.message
