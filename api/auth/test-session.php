<?php
header('Content-Type: application/json');
session_start();

// Debug info
$debug = [
    'session_id' => session_id(),
    'session_name' => session_name(),
    'session_status' => session_status(),
    'php_sapi' => php_sapi_name(),
    'http_host' => $_SERVER['HTTP_HOST'] ?? 'N/A',
    'script_filename' => __FILE__,
    'cookies_set' => headers_list(),
    'session_save_path' => session_save_path(),
];

// Set simple session var
$_SESSION['test'] = 'working';

echo json_encode([
    'message' => 'Session test',
    'debug' => $debug,
    'session_data' => $_SESSION,
]);
