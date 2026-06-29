<?php
header('Content-Type: application/json');

require __DIR__ . '/../config/auth.php';
$currentUser = requireAdminUser('Hanya admin yang dapat mengedit akun guru');

require __DIR__ . '/../config/database.php';

$payload = json_decode(file_get_contents('php://input'), true);
$id       = (int) ($payload['id'] ?? 0);
$newName  = trim((string) ($payload['name'] ?? ''));
$newUsername = preg_replace('/[^a-z0-9._-]+/', '', strtolower(trim((string) ($payload['username'] ?? ''))));

if ($id <= 0 || $newName === '' || $newUsername === '') {
    http_response_code(422);
    echo json_encode(['message' => 'ID, nama, dan nama pengguna wajib diisi']);
    exit;
}

$stmt = $pdo->prepare('SELECT id, username, name, role FROM users WHERE id = ? LIMIT 1');
$stmt->execute([$id]);
$user = $stmt->fetch();

if (!$user) {
    http_response_code(404);
    echo json_encode(['message' => 'Akun tidak ditemukan']);
    exit;
}

if ((int) $user['id'] === (int) ($currentUser['id'] ?? 0)) {
    http_response_code(403);
    echo json_encode(['message' => 'Edit akun sendiri dilakukan melalui profil, bukan di sini']);
    exit;
}

if (isAdminRole($user['role'] ?? null)) {
    http_response_code(403);
    echo json_encode(['message' => 'Akun admin tidak dapat diedit dari dashboard ini']);
    exit;
}

// check username uniqueness if it changed
if ($newUsername !== $user['username']) {
    $checkStmt = $pdo->prepare('SELECT id FROM users WHERE username = ? AND id != ? LIMIT 1');
    $checkStmt->execute([$newUsername, $id]);
    if ($checkStmt->fetch()) {
        http_response_code(409);
        echo json_encode(['message' => 'Nama pengguna ini sudah dipakai akun lain']);
        exit;
    }
}

$updateStmt = $pdo->prepare('UPDATE users SET name = ?, username = ? WHERE id = ? LIMIT 1');
$updateStmt->execute([$newName, $newUsername, $id]);

echo json_encode([
    'message' => 'Akun berhasil diperbarui',
    'updatedUser' => [
        'id'       => $id,
        'name'     => $newName,
        'username' => $newUsername,
        'role'     => $user['role'],
    ],
]);
