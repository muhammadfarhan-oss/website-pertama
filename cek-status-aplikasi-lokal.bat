@echo off
setlocal

echo ================================
echo   STATUS ABSENSI HALAQOH LOKAL
echo ================================
echo.

set "APACHE_STATUS=MATI"
set "MYSQL_STATUS=MATI"
set "APP_STATUS=GAGAL DIAKSES"

tasklist /FI "IMAGENAME eq httpd.exe" | find /I "httpd.exe" >nul
if not errorlevel 1 set "APACHE_STATUS=AKTIF"

tasklist /FI "IMAGENAME eq mysqld.exe" | find /I "mysqld.exe" >nul
if not errorlevel 1 set "MYSQL_STATUS=AKTIF"

powershell.exe -NoProfile -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost/website-pertama/' -UseBasicParsing -TimeoutSec 3; if ($response.StatusCode -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }"
if not errorlevel 1 set "APP_STATUS=SIAP DIGUNAKAN"

echo Apache : %APACHE_STATUS%
echo MySQL  : %MYSQL_STATUS%
echo Aplikasi : %APP_STATUS%
echo.

if /I "%APP_STATUS%"=="SIAP DIGUNAKAN" (
  echo URL: http://localhost/website-pertama/
) else (
  echo Jalankan "Buka Absensi Halaqoh.bat" untuk menyalakan layanan.
)

echo.
pause