<?php
header('Content-Type: application/json');

require __DIR__ . '/../config/auth.php';
require __DIR__ . '/../config/database.php';

$currentUser = requireAdminUser('Hanya admin yang dapat membuat akun guru baru');

$payload = json_decode(file_get_contents('php://input'), true);

$name = trim($payload['name'] ?? '');
$role = 'guru';
$username = preg_replace('/[^a-z0-9._-]+/', '', strtolower(trim($payload['username'] ?? '')));
$password = trim($payload['password'] ?? '');

if ($name === '' || $role === '' || $username === '' || $password === '') {
    http_response_code(422);
    echo json_encode(['message' => 'Lengkapi semua data akun baru']);
    exit;
}

if (strlen($password) < 6) {
    http_response_code(422);
    echo json_encode(['message' => 'Password minimal 6 karakter']);
    exit;
}

$checkStmt = $pdo->prepare('SELECT id FROM users WHERE username = ? LIMIT 1');
$checkStmt->execute([$username]);

if ($checkStmt->fetch()) {
    http_response_code(409);
    echo json_encode(['message' => 'Nama pengguna ini sudah dipakai akun lain']);
    exit;
}

$passwordHash = password_hash($password, PASSWORD_DEFAULT);
$insertStmt = $pdo->prepare('INSERT INTO users (username, password_hash, name, role) VALUES (?, ?, ?, ?)');
$insertStmt->execute([$username, $passwordHash, $name, $role]);

echo json_encode([
    'message' => 'Akun berhasil dibuat',
    'user' => [
        'id' => (int) $pdo->lastInsertId(),
        'username' => $username,
        'name' => $name,
        'role' => $role,
        'isActive' => true,
    ],
]);