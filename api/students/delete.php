<?php
header('Content-Type: application/json');

require __DIR__ . '/../config/auth.php';

requireAdminUser('Hanya admin yang dapat menghapus data santri');

require __DIR__ . '/../config/database.php';

$payload = json_decode(file_get_contents('php://input'), true);
$studentCode = trim($payload['id'] ?? '');

if ($studentCode === '') {
    http_response_code(422);
    echo json_encode(['message' => 'Kode santri wajib diisi']);
    exit;
}

$deleteStmt = $pdo->prepare('DELETE FROM students WHERE student_code = ?');
$deleteStmt->execute([$studentCode]);

if ($deleteStmt->rowCount() === 0) {
    http_response_code(404);
    echo json_encode(['message' => 'Santri tidak ditemukan']);
    exit;
}

echo json_encode(['message' => 'Santri berhasil dihapus']);