<?php
header('Content-Type: application/json');

require __DIR__ . '/../config/auth.php';

requireAdminUser('Hanya admin yang dapat menambahkan data santri');

require __DIR__ . '/../config/database.php';

$payload = json_decode(file_get_contents('php://input'), true);

$studentCode = trim($payload['id'] ?? '');
$name = trim($payload['name'] ?? '');
$division = trim($payload['division'] ?? '');
$category = trim($payload['role'] ?? '');
$fatherName = trim($payload['fatherName'] ?? '');
$motherName = trim($payload['motherName'] ?? '');

if ($name === '' || $division === '' || $category === '') {
    http_response_code(422);
    echo json_encode(['message' => 'Nama, halaqoh, dan kategori wajib diisi']);
    exit;
}

if ($studentCode === '') {
    $stmt = $pdo->query("SELECT COALESCE(MAX(CAST(SUBSTRING(student_code, 5) AS UNSIGNED)), 0) AS last_number FROM students WHERE student_code LIKE 'EMP-%'");
    $lastNumber = (int) ($stmt->fetch()['last_number'] ?? 0);
    $studentCode = 'EMP-' . str_pad((string) ($lastNumber + 1), 3, '0', STR_PAD_LEFT);
}

$checkStmt = $pdo->prepare('SELECT student_code FROM students WHERE student_code = ? LIMIT 1');
$checkStmt->execute([$studentCode]);

if ($checkStmt->fetch()) {
    http_response_code(409);
    echo json_encode(['message' => 'Kode santri sudah dipakai']);
    exit;
}

$insertStmt = $pdo->prepare('INSERT INTO students (student_code, name, division, category, father_name, mother_name) VALUES (?, ?, ?, ?, ?, ?)');
$insertStmt->execute([$studentCode, $name, $division, $category, $fatherName, $motherName]);

echo json_encode([
    'message' => 'Santri berhasil ditambahkan',
    'student' => [
        'id' => $studentCode,
        'name' => $name,
        'division' => $division,
        'role' => $category,
        'fatherName' => $fatherName,
        'motherName' => $motherName,
    ],
]);