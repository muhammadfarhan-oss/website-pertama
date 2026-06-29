<?php
header('Content-Type: application/json');

require __DIR__ . '/../config/auth.php';
$currentUser = requireAdminUser('Hanya admin yang dapat mengubah status akun guru');

require __DIR__ . '/../config/database.php';

$payload = json_decode(file_get_contents('php://input'), true);
$id = (int) ($payload['id'] ?? 0);
$isActive = filter_var($payload['isActive'] ?? null, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);

if ($id <= 0 || $isActive === null) {
    http_response_code(422);
    echo json_encode(['message' => 'Status akun yang diminta tidak valid']);
    exit;
}

$stmt = $pdo->prepare('SELECT id, username, name, role, is_active FROM users WHERE id = ? LIMIT 1');
$stmt->execute([$id]);
$user = $stmt->fetch();

if (!$user) {
    http_response_code(404);
    echo json_encode(['message' => 'Akun tidak ditemukan']);
    exit;
}

if ((int) $user['id'] === (int) ($currentUser['id'] ?? 0)) {
    http_response_code(403);
    echo json_encode(['message' => 'Admin tidak dapat mengubah status akun yang sedang dipakai']);
    exit;
}

if (isAdminRole($user['role'] ?? null)) {
    http_response_code(403);
    echo json_encode(['message' => 'Status akun admin tidak dapat diubah dari dashboard ini']);
    exit;
}

$updateStmt = $pdo->prepare('UPDATE users SET is_active = ? WHERE id = ? LIMIT 1');
$updateStmt->execute([$isActive ? 1 : 0, $id]);

echo json_encode([
    'message' => $isActive ? 'Akun berhasil diaktifkan kembali' : 'Akun berhasil dinonaktifkan',
    'updatedUser' => [
        'id' => (int) $user['id'],
        'username' => $user['username'],
        'name' => $user['name'],
        'role' => $user['role'],
        'isActive' => $isActive,
    ],
]);