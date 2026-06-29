<?php
header('Content-Type: application/json');

require __DIR__ . '/../config/auth.php';

requireAdminUser('Hanya admin yang dapat mengubah data absensi');

require __DIR__ . '/../config/database.php';

$payload = json_decode(file_get_contents('php://input'), true);

$attendanceCode = trim($payload['id'] ?? '');
$studentCode = trim($payload['employeeId'] ?? '');
$attendanceDate = trim($payload['date'] ?? '');
$checkIn = trim($payload['checkIn'] ?? '');
$status = trim($payload['status'] ?? '');
$note = trim($payload['note'] ?? '');

if ($attendanceCode === '' || $studentCode === '' || $attendanceDate === '' || $status === '') {
    http_response_code(422);
    echo json_encode(['message' => 'ID absensi, santri, tanggal, dan status wajib diisi']);
    exit;
}

$attendanceId = (int) preg_replace('/[^0-9]/', '', $attendanceCode);

if ($attendanceId <= 0) {
    http_response_code(422);
    echo json_encode(['message' => 'ID absensi tidak valid']);
    exit;
}

$studentStmt = $pdo->prepare('SELECT id FROM students WHERE student_code = ? LIMIT 1');
$studentStmt->execute([$studentCode]);
$student = $studentStmt->fetch();

if (!$student) {
    http_response_code(404);
    echo json_encode(['message' => 'Santri tidak ditemukan']);
    exit;
}

$checkStmt = $pdo->prepare('SELECT id FROM attendance WHERE id = ? LIMIT 1');
$checkStmt->execute([$attendanceId]);

if (!$checkStmt->fetch()) {
    http_response_code(404);
    echo json_encode(['message' => 'Data absensi tidak ditemukan']);
    exit;
}

$normalizedCheckIn = $checkIn === '' || $checkIn === '-' ? null : $checkIn . ':00';
$normalizedNote = $note === '' ? 'Tidak ada catatan' : $note;

$updateStmt = $pdo->prepare('UPDATE attendance SET student_id = ?, attendance_date = ?, check_in = ?, status = ?, note = ? WHERE id = ?');
$updateStmt->execute([(int) $student['id'], $attendanceDate, $normalizedCheckIn, $status, $normalizedNote, $attendanceId]);

echo json_encode([
    'message' => 'Data absensi berhasil diperbarui',
    'attendance' => [
        'id' => 'ATT-' . str_pad((string) $attendanceId, 3, '0', STR_PAD_LEFT),
        'employeeId' => $studentCode,
        'date' => $attendanceDate,
        'checkIn' => $normalizedCheckIn ? substr($normalizedCheckIn, 0, 5) : '-',
        'status' => $status,
        'note' => $normalizedNote,
    ],
]);