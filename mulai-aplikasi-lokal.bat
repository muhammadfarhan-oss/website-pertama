@echo off
setlocal

set "XAMPP_DIR=C:\xampp"
set "APACHE_START=%XAMPP_DIR%\apache_start.bat"
set "MYSQL_START=%XAMPP_DIR%\mysql_start.bat"

for /f %%i in ('powershell.exe -NoProfile -Command "Get-Date -Format yyyyMMddHHmmss"') do set "CACHE_BUSTER=%%i"
set "APP_URL=http://localhost/website-pertama/?v=%CACHE_BUSTER%"

if not exist "%APACHE_START%" (
  echo File Apache start tidak ditemukan di %APACHE_START%
  pause
  exit /b 1
)

if not exist "%MYSQL_START%" (
  echo File MySQL start tidak ditemukan di %MYSQL_START%
  pause
  exit /b 1
)

echo Memeriksa status MySQL...
tasklist /FI "IMAGENAME eq mysqld.exe" | find /I "mysqld.exe" >nul
if errorlevel 1 (
  echo Menyalakan MySQL dari XAMPP...
  start "MySQL XAMPP" /MIN "%MYSQL_START%"
)

echo Menunggu MySQL siap menerima koneksi...
set /a MYSQL_WAIT=0
:wait_mysql
"%XAMPP_DIR%\mysql\bin\mysqladmin.exe" -u root ping >nul 2>&1
if not errorlevel 1 goto mysql_ready
set /a MYSQL_WAIT+=1
if %MYSQL_WAIT% GEQ 20 goto mysql_failed
ping 127.0.0.1 -n 2 >nul
goto wait_mysql

:mysql_failed
echo MySQL belum siap. Cek XAMPP Control Panel.
pause
exit /b 1

:mysql_ready
echo MySQL siap.

echo Memeriksa status Apache...
tasklist /FI "IMAGENAME eq httpd.exe" | find /I "httpd.exe" >nul
if errorlevel 1 (
  echo Menyalakan Apache dari XAMPP...
  start "Apache XAMPP" /MIN "%APACHE_START%"
)

echo Menunggu Apache siap melayani localhost...
set /a APACHE_WAIT=0
:wait_apache
powershell.exe -NoProfile -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost/' -UseBasicParsing -TimeoutSec 3; if ($response.StatusCode -ge 200) { exit 0 } else { exit 1 } } catch { exit 1 }"
if not errorlevel 1 goto apache_ready
set /a APACHE_WAIT+=1
if %APACHE_WAIT% GEQ 20 goto apache_failed
ping 127.0.0.1 -n 2 >nul
goto wait_apache

:apache_failed
echo Apache belum siap. Cek XAMPP Control Panel atau konflik port 80.
pause
exit /b 1

:apache_ready
echo Apache siap.
echo Membuka aplikasi fresh session...
start "" "%APP_URL%"

echo Aplikasi sudah dibuka di browser.
exit /b 0