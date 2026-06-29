<?php
header('Content-Type: application/json');

require __DIR__ . '/../config/auth.php';

requireAdminUser('Hanya admin yang dapat mengubah data santri');

require __DIR__ . '/../config/database.php';

$payload = json_decode(file_get_contents('php://input'), true);

$studentCode = trim($payload['id'] ?? '');
$name = trim($payload['name'] ?? '');
$division = trim($payload['division'] ?? '');
$category = trim($payload['role'] ?? '');
$fatherName = trim($payload['fatherName'] ?? '');
$motherName = trim($payload['motherName'] ?? '');

if ($studentCode === '' || $name === '' || $division === '' || $category === '') {
    http_response_code(422);
    echo json_encode(['message' => 'Kode santri, nama, halaqoh, dan kategori wajib diisi']);
    exit;
}

$checkStmt = $pdo->prepare('SELECT id FROM students WHERE student_code = ? LIMIT 1');
$checkStmt->execute([$studentCode]);
$student = $checkStmt->fetch();

if (!$student) {
    http_response_code(404);
    echo json_encode(['message' => 'Santri tidak ditemukan']);
    exit;
}

$updateStmt = $pdo->prepare('UPDATE students SET name = ?, division = ?, category = ?, father_name = ?, mother_name = ? WHERE student_code = ?');
$updateStmt->execute([$name, $division, $category, $fatherName, $motherName, $studentCode]);

echo json_encode([
    'message' => 'Data santri berhasil diperbarui',
    'student' => [
        'id' => $studentCode,
        'name' => $name,
        'division' => $division,
        'role' => $category,
        'fatherName' => $fatherName,
        'motherName' => $motherName,
    ],
]);