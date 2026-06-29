<?php
header('Content-Type: application/json');

require __DIR__ . '/../config/auth.php';
require __DIR__ . '/../config/database.php';

$currentUser = requireAuthenticatedUser();

$payload = json_decode(file_get_contents('php://input'), true);

$username = preg_replace('/[^a-z0-9._-]+/', '', strtolower(trim($payload['username'] ?? '')));
$password = trim($payload['password'] ?? '');

if ($username === '' || $password === '') {
    http_response_code(422);
    echo json_encode(['message' => 'Nama pengguna dan password baru wajib diisi']);
    exit;
}

if (strlen($password) < 6) {
    http_response_code(422);
    echo json_encode(['message' => 'Password baru minimal 6 karakter']);
    exit;
}

if (!isAdminRole($currentUser['role']) && $username !== strtolower((string) $currentUser['username'])) {
    http_response_code(403);
    echo json_encode(['message' => 'Anda tidak diizinkan mereset kata sandi akun lain']);
    exit;
}

$checkStmt = $pdo->prepare('SELECT id FROM users WHERE username = ? LIMIT 1');
$checkStmt->execute([$username]);
$user = $checkStmt->fetch();

if (!$user) {
    http_response_code(404);
    echo json_encode(['message' => 'Nama pengguna akun belum terdaftar']);
    exit;
}

$passwordHash = password_hash($password, PASSWORD_DEFAULT);
$updateStmt = $pdo->prepare('UPDATE users SET password_hash = ? WHERE id = ?');
$updateStmt->execute([$passwordHash, (int) $user['id']]);

echo json_encode(['message' => 'Password berhasil diperbarui']);