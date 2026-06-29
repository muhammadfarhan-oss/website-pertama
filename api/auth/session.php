<?php
header('Content-Type: application/json');

require __DIR__ . '/../config/auth.php';

echo json_encode([
    'user' => requireAuthenticatedUser(),
]);