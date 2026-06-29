<?php
header('Content-Type: application/json');

require __DIR__ . '/../config/auth.php';

requireAuthenticatedUser();

require __DIR__ . '/../config/database.php';

$stmt = $pdo->query('SELECT student_code, name, division, category, father_name, mother_name FROM students ORDER BY name ASC');
$rows = $stmt->fetchAll();

$students = array_map(static function ($row) {
    return [
        'id' => $row['student_code'],
        'name' => $row['name'],
        'division' => $row['division'],
        'role' => $row['category'],
        'fatherName' => $row['father_name'],
        'motherName' => $row['mother_name'],
    ];
}, $rows);

echo json_encode(['students' => $students]);