<?php
header('Content-Type: application/json');

require __DIR__ . '/../config/auth.php';

requireAdminUser('Hanya admin yang dapat melihat daftar akun pengelola');

require __DIR__ . '/../config/database.php';

$stmt = $pdo->query('SELECT id, username, name, role, is_active, created_at FROM users ORDER BY is_active DESC, id ASC');
$rows = $stmt->fetchAll();

$users = array_map(static function ($row) {
    return [
        'id' => (int) $row['id'],
        'username' => $row['username'],
        'name' => $row['name'],
        'role' => $row['role'],
        'isActive' => (bool) $row['is_active'],
        'createdAt' => $row['created_at'],
    ];
}, $rows);

echo json_encode(['users' => $users]);