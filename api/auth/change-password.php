<?php
header('Content-Type: application/json');

require __DIR__ . '/../config/auth.php';
require __DIR__ . '/../config/database.php';

$currentUser = requireAuthenticatedUser();

$payload = json_decode(file_get_contents('php://input'), true);

$currentPassword = trim($payload['currentPassword'] ?? '');
$newPassword = trim($payload['newPassword'] ?? '');

if ($currentPassword === '' || $newPassword === '') {
    http_response_code(422);
    echo json_encode(['message' => 'Password lama dan password baru wajib diisi']);
    exit;
}

if (strlen($newPassword) < 8) {
    http_response_code(422);
    echo json_encode(['message' => 'Password baru minimal 8 karakter']);
    exit;
}

$stmt = $pdo->prepare('SELECT id, password_hash FROM users WHERE id = ? LIMIT 1');
$stmt->execute([(int) $currentUser['id']]);
$user = $stmt->fetch();

if (!$user || !password_verify($currentPassword, $user['password_hash'])) {
    http_response_code(401);
    echo json_encode(['message' => 'Password lama tidak sesuai']);
    exit;
}

if (password_verify($newPassword, $user['password_hash'])) {
    http_response_code(422);
    echo json_encode(['message' => 'Password baru tidak boleh sama dengan password lama']);
    exit;
}

$passwordHash = password_hash($newPassword, PASSWORD_DEFAULT);
$updateStmt = $pdo->prepare('UPDATE users SET password_hash = ? WHERE id = ?');
$updateStmt->execute([$passwordHash, (int) $user['id']]);

echo json_encode(['message' => 'Password berhasil diganti']);
