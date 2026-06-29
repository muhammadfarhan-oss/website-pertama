<?php
session_start();
header('Content-Type: application/json');

require __DIR__ . '/../config/database.php';

$payload = json_decode(file_get_contents('php://input'), true);

$username = trim($payload['username'] ?? '');
$password = trim($payload['password'] ?? '');

if ($username === '' || $password === '') {
    http_response_code(422);
    echo json_encode(['message' => 'Username dan password wajib diisi']);
    exit;
}

$stmt = $pdo->prepare('SELECT id, username, password_hash, name, role, is_active FROM users WHERE username = ? LIMIT 1');
$stmt->execute([$username]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    http_response_code(401);
    echo json_encode(['message' => 'Login gagal']);
    exit;
}

if (!(bool) ($user['is_active'] ?? false)) {
    http_response_code(403);
    echo json_encode(['message' => 'Akun ini nonaktif. Hubungi admin untuk mengaktifkannya kembali.']);
    exit;
}

$_SESSION['user'] = [
    'id' => (int) $user['id'],
    'username' => $user['username'],
    'name' => $user['name'],
    'role' => $user['role'],
    'isActive' => true,
];

echo json_encode([
    'message' => 'Login berhasil',
    'user' => $_SESSION['user'],
]);