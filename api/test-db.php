<?php
header('Content-Type: application/json; charset=utf-8');

if (PHP_SAPI !== 'cli') {
    $clientIp = $_SERVER['REMOTE_ADDR'] ?? '';
    $allowedIps = ['127.0.0.1', '::1'];

    if (!in_array($clientIp, $allowedIps, true)) {
        http_response_code(403);
        echo json_encode([
            'message' => 'Endpoint pengecekan database hanya bisa diakses dari localhost.',
        ]);
        exit;
    }
}

require __DIR__ . '/config/database.php';

echo json_encode(['message' => 'Koneksi database berhasil']);