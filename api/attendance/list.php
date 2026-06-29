<?php
header('Content-Type: application/json');

require __DIR__ . '/../config/auth.php';

requireAuthenticatedUser();

require __DIR__ . '/../config/database.php';

$sql = 'SELECT attendance.id, students.student_code, attendance.attendance_date, attendance.check_in, attendance.status, attendance.note
        FROM attendance
        INNER JOIN students ON students.id = attendance.student_id
        ORDER BY attendance.attendance_date DESC, attendance.check_in DESC, attendance.id DESC';
$stmt = $pdo->query($sql);
$rows = $stmt->fetchAll();

$attendance = array_map(static function ($row) {
    return [
        'id' => 'ATT-' . str_pad((string) $row['id'], 3, '0', STR_PAD_LEFT),
        'employeeId' => $row['student_code'],
        'date' => $row['attendance_date'],
        'checkIn' => $row['check_in'] ? substr($row['check_in'], 0, 5) : '-',
        'status' => $row['status'],
        'note' => $row['note'] ?: 'Tidak ada catatan',
    ];
}, $rows);

echo json_encode(['attendance' => $attendance]);