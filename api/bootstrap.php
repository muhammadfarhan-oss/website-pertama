<?php
header('Content-Type: application/json');

require __DIR__ . '/config/auth.php';

requireAdminUser('Hanya admin yang dapat menjalankan bootstrap data awal');

require __DIR__ . '/config/database.php';

$studentsSeed = [
    ['student_code' => 'EMP-001', 'name' => 'Rina Putri', 'division' => 'Halaqoh Tahsin Akhwat', 'category' => 'Santri Tahsin'],
    ['student_code' => 'EMP-002', 'name' => 'Bima Saputra', 'division' => 'Halaqoh Tahfizh Putra', 'category' => 'Santri Tahfizh'],
    ['student_code' => 'EMP-003', 'name' => 'Dina Maharani', 'division' => 'Halaqoh Tahsin Akhwat', 'category' => 'Santri Tahsin'],
    ['student_code' => 'EMP-004', 'name' => 'Yoga Pratama', 'division' => 'Halaqoh Tahfizh Putra', 'category' => 'Santri Tahfizh'],
    ['student_code' => 'EMP-005', 'name' => 'Siska Lestari', 'division' => 'Halaqoh Adab Akhwat', 'category' => 'Santri Pembinaan'],
    ['student_code' => 'EMP-006', 'name' => 'Adi Nugroho', 'division' => 'Halaqoh Tahfizh Putra', 'category' => 'Santri Tahfizh'],
];

$attendanceSeed = [
    ['student_code' => 'EMP-001', 'attendance_date' => '2026-05-13', 'check_in' => '07:23:00', 'status' => 'Hadir', 'note' => 'Hadir tepat waktu'],
    ['student_code' => 'EMP-002', 'attendance_date' => '2026-05-13', 'check_in' => '08:12:00', 'status' => 'Terlambat', 'note' => 'Datang setelah muraja\'ah dimulai'],
    ['student_code' => 'EMP-003', 'attendance_date' => '2026-05-13', 'check_in' => '07:12:00', 'status' => 'Hadir', 'note' => 'Kehadiran paling awal'],
    ['student_code' => 'EMP-004', 'attendance_date' => '2026-05-13', 'check_in' => null, 'status' => 'Sakit', 'note' => 'Tidak hadir karena sakit'],
    ['student_code' => 'EMP-005', 'attendance_date' => '2026-05-13', 'check_in' => null, 'status' => 'Izin', 'note' => 'Izin karena sakit'],
    ['student_code' => 'EMP-006', 'attendance_date' => '2026-05-13', 'check_in' => '07:51:00', 'status' => 'Hadir', 'note' => 'Siap mengikuti setoran hafalan'],
    ['student_code' => 'EMP-001', 'attendance_date' => '2026-04-12', 'check_in' => '07:27:00', 'status' => 'Hadir', 'note' => 'Arsip bulan lalu'],
    ['student_code' => 'EMP-002', 'attendance_date' => '2026-03-12', 'check_in' => '07:58:00', 'status' => 'Hadir', 'note' => 'Arsip Maret'],
    ['student_code' => 'EMP-003', 'attendance_date' => '2026-02-15', 'check_in' => '07:35:00', 'status' => 'Hadir', 'note' => 'Arsip Februari'],
    ['student_code' => 'EMP-004', 'attendance_date' => '2026-01-18', 'check_in' => null, 'status' => 'Sakit', 'note' => 'Arsip Januari'],
];

$reportsSeed = [
    ['title' => 'Rekap kehadiran halaqoh tahfizh', 'report_format' => 'PDF', 'note' => 'Laporan rutin pekanan santri', 'period_type' => 'weekly', 'reference_date' => '2026-05-12', 'letter_number' => 'REP-001'],
    ['title' => 'Evaluasi ketepatan hadir bulanan', 'report_format' => 'XLS', 'note' => 'Ditinjau musyrif halaqoh', 'period_type' => 'monthly', 'reference_date' => '2026-05-11', 'letter_number' => 'REP-002'],
    ['title' => 'Daftar izin dan berhalangan aktif', 'report_format' => 'DOC', 'note' => 'Monitoring kehadiran santri berjalan', 'period_type' => 'weekly', 'reference_date' => '2026-05-10', 'letter_number' => 'REP-003'],
];

$studentCount = (int) ($pdo->query('SELECT COUNT(*) AS total FROM students')->fetch()['total'] ?? 0);
$attendanceCount = (int) ($pdo->query('SELECT COUNT(*) AS total FROM attendance')->fetch()['total'] ?? 0);
$reportCount = (int) ($pdo->query('SELECT COUNT(*) AS total FROM reports')->fetch()['total'] ?? 0);

if ($studentCount === 0) {
    $insertStudentStmt = $pdo->prepare('INSERT INTO students (student_code, name, division, category) VALUES (?, ?, ?, ?)');
    foreach ($studentsSeed as $student) {
        $insertStudentStmt->execute([$student['student_code'], $student['name'], $student['division'], $student['category']]);
    }
}

if ($attendanceCount === 0) {
    $studentMapStmt = $pdo->query('SELECT id, student_code FROM students');
    $studentMapRows = $studentMapStmt->fetchAll();
    $studentMap = [];
    foreach ($studentMapRows as $row) {
        $studentMap[$row['student_code']] = (int) $row['id'];
    }

    $insertAttendanceStmt = $pdo->prepare('INSERT INTO attendance (student_id, attendance_date, check_in, status, note) VALUES (?, ?, ?, ?, ?)');
    foreach ($attendanceSeed as $attendance) {
        $studentId = $studentMap[$attendance['student_code']] ?? null;
        if (!$studentId) {
            continue;
        }

        $insertAttendanceStmt->execute([$studentId, $attendance['attendance_date'], $attendance['check_in'], $attendance['status'], $attendance['note']]);
    }
}

if ($reportCount === 0) {
    $defaultStudentId = (int) ($pdo->query('SELECT id FROM students ORDER BY id ASC LIMIT 1')->fetch()['id'] ?? 0);
    $insertReportStmt = $pdo->prepare('INSERT INTO reports (student_id, title, report_format, note, period_type, reference_date, letter_number, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    foreach ($reportsSeed as $report) {
        $insertReportStmt->execute([$defaultStudentId ?: null, $report['title'], $report['report_format'], $report['note'], $report['period_type'], $report['reference_date'], $report['letter_number'], 1]);
    }
}

echo json_encode(['message' => 'Bootstrap data selesai']);