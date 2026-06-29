<?php
header('Content-Type: application/json');

require __DIR__ . '/../config/auth.php';

requireAuthenticatedUser();

require __DIR__ . '/../config/database.php';

$sql = 'SELECT id, title, report_format, note, created_at FROM reports ORDER BY created_at DESC, id DESC';
$stmt = $pdo->query($sql);
$rows = $stmt->fetchAll();

$reports = array_map(static function ($row) {
    $createdAt = $row['created_at']
        ? date('Y-m-d H:i', strtotime($row['created_at']))
        : date('Y-m-d H:i');

    return [
        'id' => 'REP-' . str_pad((string) $row['id'], 3, '0', STR_PAD_LEFT),
        'title' => $row['title'],
        'type' => $row['report_format'],
        'note' => $row['note'] ?: 'Tanpa catatan',
        'createdAt' => $createdAt,
    ];
}, $rows);

echo json_encode(['reports' => $reports]);