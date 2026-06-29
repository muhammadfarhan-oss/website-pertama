<?php
session_start();

function isAdminRole(string $role = null): bool
{
    return strtolower((string) $role) === 'admin';
}

function normalizeAuthenticatedUser(array $user): array
{
    return [
        'id' => (int) $user['id'],
        'username' => $user['username'],
        'name' => $user['name'],
        'role' => $user['role'],
        'isActive' => (bool) ($user['is_active'] ?? $user['isActive'] ?? false),
    ];
}

function requireAuthenticatedUser(): array
{
    $sessionUser = $_SESSION['user'] ?? null;

    if (!is_array($sessionUser) || !isset($sessionUser['id'])) {
        http_response_code(401);
        echo json_encode(['message' => 'Belum login']);
        exit;
    }

    require __DIR__ . '/database.php';

    $stmt = $pdo->prepare('SELECT id, username, name, role, is_active FROM users WHERE id = ? LIMIT 1');
    $stmt->execute([(int) $sessionUser['id']]);
    $freshUser = $stmt->fetch();

    if (!$freshUser || !(bool) ($freshUser['is_active'] ?? false)) {
        unset($_SESSION['user']);
        http_response_code(401);
        echo json_encode(['message' => 'Akun ini sudah nonaktif. Silakan hubungi admin.']);
        exit;
    }

    $_SESSION['user'] = normalizeAuthenticatedUser($freshUser);

    return $_SESSION['user'];
}

function requireAdminUser(string $message = 'Hanya admin yang dapat mengakses fitur ini'): array
{
    $user = requireAuthenticatedUser();

    if (!isAdminRole($user['role'] ?? null)) {
        http_response_code(403);
        echo json_encode(['message' => $message]);
        exit;
    }

    return $user;
}