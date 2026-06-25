@echo off
setlocal enabledelayedexpansion

set "PROJECT_DIR=%~dp0"
set "BACKUP_DIR=%PROJECT_DIR%database-backups"
set "MYSQLDUMP_EXE=C:\xampp\mysql\bin\mysqldump.exe"
set "DB_NAME=absensi_halaqoh"
set "DB_USER=root"
set "DB_HOST=localhost"

if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

for /f %%I in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set "TS=%%I"
set "OUT_FILE=%BACKUP_DIR%\%DB_NAME%-%TS%.sql"

echo [INFO] Membuat backup database ke: "%OUT_FILE%"
"%MYSQLDUMP_EXE%" -u %DB_USER% -h %DB_HOST% %DB_NAME% > "%OUT_FILE%"

if errorlevel 1 (
  echo [ERROR] Backup gagal. Pastikan MySQL XAMPP sedang berjalan.
  exit /b 1
)

for %%F in ("%OUT_FILE%") do set "SIZE=%%~zF"
echo [OK] Backup selesai. Ukuran file: !SIZE! bytes

rem Hapus backup lama, sisakan 12 file terbaru (sekitar 3 bulan jika mingguan)
powershell -NoProfile -Command "Get-ChildItem -Path '%BACKUP_DIR%' -Filter '%DB_NAME%-*.sql' | Sort-Object LastWriteTime -Descending | Select-Object -Skip 12 | Remove-Item -Force"

echo [OK] Retensi backup diterapkan (menyimpan 12 file terbaru).
endlocal
