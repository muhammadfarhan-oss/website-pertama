@echo off
setlocal enabledelayedexpansion

set "PROJECT_DIR=%~dp0"
set "BACKUP_DIR=%PROJECT_DIR%database-backups"
set "MYSQL_EXE=C:\xampp\mysql\bin\mysql.exe"
set "DB_NAME=absensi_halaqoh"
set "DB_USER=root"
set "DB_HOST=localhost"

set "BACKUP_FILE="
set "FORCE=0"
set "CHECK_ONLY=0"

for %%A in (%*) do (
  if /I "%%~A"=="/Y" set "FORCE=1"
  if /I "%%~A"=="/CHECK" set "CHECK_ONLY=1"
  if /I not "%%~A"=="/Y" if /I not "%%~A"=="/CHECK" if not defined BACKUP_FILE set "BACKUP_FILE=%%~A"
)

if not exist "%BACKUP_DIR%" (
  echo [ERROR] Folder backup tidak ditemukan: "%BACKUP_DIR%"
  exit /b 1
)

if defined BACKUP_FILE (
  if not exist "%BACKUP_FILE%" if exist "%BACKUP_DIR%\%BACKUP_FILE%" set "BACKUP_FILE=%BACKUP_DIR%\%BACKUP_FILE%"
)

if not defined BACKUP_FILE (
  for /f "delims=" %%F in ('dir /b /a-d /o-d "%BACKUP_DIR%\%DB_NAME%-*.sql" 2^>nul') do (
    set "BACKUP_FILE=%BACKUP_DIR%\%%F"
    goto :backup_found
  )
)

:backup_found
if not defined BACKUP_FILE (
  echo [ERROR] Tidak ada file backup .sql yang ditemukan.
  exit /b 1
)

if not exist "%BACKUP_FILE%" (
  echo [ERROR] File backup tidak ditemukan: "%BACKUP_FILE%"
  exit /b 1
)

echo [INFO] Database target : %DB_NAME%
echo [INFO] File backup     : "%BACKUP_FILE%"

if "%CHECK_ONLY%"=="1" (
  echo [OK] Mode CHECK: tidak ada restore yang dijalankan.
  exit /b 0
)

if "%FORCE%"=="0" (
  echo.
  echo [WARNING] Proses ini akan MENIMPA data di database %DB_NAME%.
  set /p CONFIRM=Ketik YA_SAYA_YAKIN untuk lanjut: 
  if /I not "!CONFIRM!"=="YA_SAYA_YAKIN" (
    echo [INFO] Restore dibatalkan.
    exit /b 1
  )
)

echo [INFO] Menjalankan restore...
"%MYSQL_EXE%" -u %DB_USER% -h %DB_HOST% %DB_NAME% < "%BACKUP_FILE%"

if errorlevel 1 (
  echo [ERROR] Restore gagal. Pastikan MySQL berjalan dan file backup valid.
  exit /b 1
)

echo [OK] Restore database berhasil.
endlocal
