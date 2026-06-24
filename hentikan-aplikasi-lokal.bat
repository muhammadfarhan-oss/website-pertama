@echo off
setlocal

set "XAMPP_DIR=C:\xampp"

echo Menghentikan Apache...
tasklist /FI "IMAGENAME eq httpd.exe" | find /I "httpd.exe" >nul
if errorlevel 1 (
  echo Apache sudah tidak berjalan.
) else (
  taskkill /IM httpd.exe /F >nul 2>&1
  if exist "%XAMPP_DIR%\apache\logs\httpd.pid" del "%XAMPP_DIR%\apache\logs\httpd.pid" >nul 2>&1
  echo Apache dihentikan.
)

echo Menghentikan MySQL...
tasklist /FI "IMAGENAME eq mysqld.exe" | find /I "mysqld.exe" >nul
if errorlevel 1 (
  echo MySQL sudah tidak berjalan.
) else (
  "%XAMPP_DIR%\mysql\bin\mysqladmin.exe" -u root shutdown >nul 2>&1
  if errorlevel 1 taskkill /IM mysqld.exe /F >nul 2>&1
  echo MySQL dihentikan.
)

echo Semua service lokal untuk aplikasi sudah dihentikan.
exit /b 0