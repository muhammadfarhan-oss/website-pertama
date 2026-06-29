<?php
header('Content-Type: application/json');

require __DIR__ . '/../config/auth.php';
requireAuthenticatedUser();

require __DIR__ . '/../config/database.php';

$username  = preg_replace('/[^a-z0-9._-]+/', '', strtolower(trim((string) ($_GET['username'] ?? ''))));
$excludeId = (int) ($_GET['excludeId'] ?? 0);

if ($username === '') {
    echo json_encode(['available' => false, 'message' => 'Nama pengguna tidak boleh kosong']);
    exit;
}

if (strlen($username) < 3) {
    echo json_encode(['available' => false, 'message' => 'Minimal 3 karakter']);
    exit;
}

if ($excludeId > 0) {
    $stmt = $pdo->prepare('SELECT id FROM users WHERE username = ? AND id != ? LIMIT 1');
    $stmt->execute([$username, $excludeId]);
} else {
    $stmt = $pdo->prepare('SELECT id FROM users WHERE username = ? LIMIT 1');
    $stmt->execute([$username]);
}

$taken = (bool) $stmt->fetch();

echo json_encode([
    'available' => !$taken,
    'message'   => $taken ? 'Nama pengguna sudah dipakai' : 'Nama pengguna tersedia',
]);
