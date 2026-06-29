<?php
header('Content-Type: application/json');

require __DIR__ . '/../config/auth.php';
$currentUser = requireAdminUser('Hanya admin yang dapat menghapus akun guru');

require __DIR__ . '/../config/database.php';

$payload = json_decode(file_get_contents('php://input'), true);
$id = (int) ($payload['id'] ?? 0);

if ($id <= 0) {
    http_response_code(422);
    echo json_encode(['message' => 'ID akun tidak valid']);
    exit;
}

$stmt = $pdo->prepare('SELECT id, username, role, is_active FROM users WHERE id = ? LIMIT 1');
$stmt->execute([$id]);
$user = $stmt->fetch();

if (!$user) {
    http_response_code(404);
    echo json_encode(['message' => 'Akun tidak ditemukan']);
    exit;
}

if ((int) $user['id'] === (int) ($currentUser['id'] ?? 0)) {
    http_response_code(403);
    echo json_encode(['message' => 'Admin tidak dapat menghapus akun yang sedang dipakai']);
    exit;
}

if (isAdminRole($user['role'] ?? null)) {
    http_response_code(403);
    echo json_encode(['message' => 'Akun admin tidak dapat dihapus dari dashboard ini']);
    exit;
}

$updateStmt = $pdo->prepare('UPDATE users SET is_active = 0 WHERE id = ? LIMIT 1');
$updateStmt->execute([$id]);

echo json_encode([
    'message' => 'Akun berhasil dinonaktifkan',
    'updatedUser' => [
        'id' => (int) $user['id'],
        'username' => $user['username'],
        'role' => $user['role'],
        'isActive' => false,
    ],
]);