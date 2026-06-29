<?php
header('Content-Type: application/json');

require __DIR__ . '/../config/auth.php';

requireAuthenticatedUser();

require __DIR__ . '/../config/database.php';

$payload = json_decode(file_get_contents('php://input'), true);

$studentCode = trim($payload['employeeId'] ?? '');
$attendanceDate = trim($payload['date'] ?? '');
$checkIn = trim($payload['checkIn'] ?? '');
$status = trim($payload['status'] ?? '');
$note = trim($payload['note'] ?? '');

if ($studentCode === '' || $attendanceDate === '' || $status === '') {
    http_response_code(422);
    echo json_encode(['message' => 'Santri, tanggal, dan status wajib diisi']);
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

$normalizedCheckIn = $checkIn === '' || $checkIn === '-' ? null : $checkIn . ':00';
$normalizedNote = $note === '' ? 'Tidak ada catatan' : $note;

$insertStmt = $pdo->prepare('INSERT INTO attendance (student_id, attendance_date, check_in, status, note) VALUES (?, ?, ?, ?, ?)');
$insertStmt->execute([(int) $student['id'], $attendanceDate, $normalizedCheckIn, $status, $normalizedNote]);

$attendanceId = (int) $pdo->lastInsertId();

echo json_encode([
    'message' => 'Data absensi berhasil disimpan',
    'attendance' => [
        'id' => 'ATT-' . str_pad((string) $attendanceId, 3, '0', STR_PAD_LEFT),
        'employeeId' => $studentCode,
        'date' => $attendanceDate,
        'checkIn' => $normalizedCheckIn ? substr($normalizedCheckIn, 0, 5) : '-',
        'status' => $status,
        'note' => $normalizedNote,
    ],
]);