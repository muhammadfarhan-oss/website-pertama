@echo off
setlocal

set "PROJECT_DIR=%~dp0"
set "BACKUP_SCRIPT=%PROJECT_DIR%backup-database-mingguan.bat"
set "TASK_NAME=Backup-Absensi-Halaqoh-Mingguan"

echo [INFO] Menambahkan Task Scheduler: %TASK_NAME%
schtasks /Create /F /SC WEEKLY /D SUN /ST 19:00 /TN "%TASK_NAME%" /TR "\"%BACKUP_SCRIPT%\""

if errorlevel 1 (
  echo [ERROR] Gagal membuat jadwal otomatis.
  echo Jalankan file ini sebagai Administrator jika diperlukan.
  exit /b 1
)

echo [OK] Jadwal backup mingguan berhasil dibuat.
echo [INFO] Waktu jalan: setiap Minggu jam 19:00.
endlocal
