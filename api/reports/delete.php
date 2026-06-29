<?php
header('Content-Type: application/json');

require __DIR__ . '/../config/auth.php';

requireAdminUser('Hanya admin yang dapat menghapus laporan');

require __DIR__ . '/../config/database.php';

$payload = json_decode(file_get_contents('php://input'), true);
$reportCode = trim($payload['id'] ?? '');

if ($reportCode === '') {
    http_response_code(422);
    echo json_encode(['message' => 'ID laporan wajib diisi']);
    exit;
}

$reportId = (int) preg_replace('/[^0-9]/', '', $reportCode);

if ($reportId <= 0) {
    http_response_code(422);
    echo json_encode(['message' => 'ID laporan tidak valid']);
    exit;
}

$deleteStmt = $pdo->prepare('DELETE FROM reports WHERE id = ?');
$deleteStmt->execute([$reportId]);

if ($deleteStmt->rowCount() === 0) {
    http_response_code(404);
    echo json_encode(['message' => 'Laporan tidak ditemukan']);
    exit;
}

echo json_encode(['message' => 'Laporan berhasil dihapus']);