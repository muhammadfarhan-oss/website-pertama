<?php
header('Content-Type: application/json');

require __DIR__ . '/../config/auth.php';

requireAdminUser('Hanya admin yang dapat menghapus data absensi');

require __DIR__ . '/../config/database.php';

$payload = json_decode(file_get_contents('php://input'), true);
$attendanceCode = trim($payload['id'] ?? '');

if ($attendanceCode === '') {
    http_response_code(422);
    echo json_encode(['message' => 'ID absensi wajib diisi']);
    exit;
}

$attendanceId = (int) preg_replace('/[^0-9]/', '', $attendanceCode);

if ($attendanceId <= 0) {
    http_response_code(422);
    echo json_encode(['message' => 'ID absensi tidak valid']);
    exit;
}

$deleteStmt = $pdo->prepare('DELETE FROM attendance WHERE id = ?');
$deleteStmt->execute([$attendanceId]);

if ($deleteStmt->rowCount() === 0) {
    http_response_code(404);
    echo json_encode(['message' => 'Data absensi tidak ditemukan']);
    exit;
}

echo json_encode(['message' => 'Data absensi berhasil dihapus']);