<?php
if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    header('Content-Type: application/json; charset=utf-8');

    echo json_encode([
        'message' => 'Endpoint setup ini dinonaktifkan untuk akses web.',
    ]);
    exit;
}

require __DIR__ . '/config/database.php';

$username = 'guruhalaqoh01';
$plainPassword = 'admin123';
$name = 'Nadia Putra';
$role = 'admin';

$checkStmt = $pdo->prepare('SELECT id, username, name, role FROM users WHERE username = ? LIMIT 1');
$checkStmt->execute([$username]);
$existingUser = $checkStmt->fetch();

if ($existingUser) {
    echo json_encode([
        'message' => 'User admin sudah ada',
        'user' => $existingUser,
    ]);
    exit;
}

$passwordHash = password_hash($plainPassword, PASSWORD_DEFAULT);

$insertStmt = $pdo->prepare('INSERT INTO users (username, password_hash, name, role) VALUES (?, ?, ?, ?)');
$insertStmt->execute([$username, $passwordHash, $name, $role]);

$userId = (int) $pdo->lastInsertId();

echo json_encode([
    'message' => 'User admin berhasil dibuat',
    'user' => [
        'id' => $userId,
        'username' => $username,
        'name' => $name,
        'role' => $role,
    ],
]);