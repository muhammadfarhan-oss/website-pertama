<?php
header('Content-Type: application/json');

require __DIR__ . '/../config/auth.php';

$currentUser = requireAdminUser('Hanya admin yang dapat menyimpan laporan');

require __DIR__ . '/../config/database.php';

$payload = json_decode(file_get_contents('php://input'), true);

$title = trim($payload['title'] ?? '');
$reportFormat = strtoupper(trim($payload['type'] ?? 'DOC'));
$note = trim($payload['note'] ?? '');
$studentCode = trim($payload['studentId'] ?? '');
$periodType = trim($payload['periodType'] ?? 'weekly');
$referenceDate = trim($payload['referenceDate'] ?? date('Y-m-d'));
$letterNumber = trim($payload['letterNumber'] ?? '');
$createdByUserId = (int) $currentUser['id'];

if ($title === '') {
    http_response_code(422);
    echo json_encode(['message' => 'Judul laporan wajib diisi']);
    exit;
}

$reportFormat = in_array($reportFormat, ['DOC', 'PDF', 'XLS', 'JSON', 'CSV'], true) ? $reportFormat : 'DOC';
$note = $note === '' ? 'Tanpa catatan' : $note;

$studentId = null;
if ($studentCode !== '') {
    $studentStmt = $pdo->prepare('SELECT id FROM students WHERE student_code = ? LIMIT 1');
    $studentStmt->execute([$studentCode]);
    $student = $studentStmt->fetch();
    $studentId = $student ? (int) $student['id'] : null;
}

$insertStmt = $pdo->prepare('INSERT INTO reports (student_id, title, report_format, note, period_type, reference_date, letter_number, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
$insertStmt->execute([$studentId, $title, $reportFormat, $note, $periodType, $referenceDate, $letterNumber, $createdByUserId]);

$reportId = (int) $pdo->lastInsertId();

echo json_encode([
    'message' => 'Laporan berhasil disimpan',
    'report' => [
        'id' => 'REP-' . str_pad((string) $reportId, 3, '0', STR_PAD_LEFT),
        'title' => $title,
        'type' => $reportFormat,
        'note' => $note,
        'createdAt' => date('Y-m-d H:i'),
    ],
]);