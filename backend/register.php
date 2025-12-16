<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');
    $email = trim($_POST['email'] ?? '');
    
    if (empty($username) || empty($password) || empty($email)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit();
    }
    
    if (strlen($password) < 6) {
        echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters']);
        exit();
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email address']);
        exit();
    }
    
    // Save to file
    $userData = [
        'username' => $username,
        'password' => password_hash($password, PASSWORD_DEFAULT),
        'email' => $email
    ];
    
    $file = 'users.json';
    $users = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    
    // Check if username exists
    foreach ($users as $user) {
        if ($user['username'] === $username) {
            echo json_encode(['success' => false, 'message' => 'Username already exists']);
            exit();
        }
    }
    
    $users[] = $userData;
    file_put_contents($file, json_encode($users));
    
    echo json_encode(['success' => true, 'message' => 'Successfully registered!']);
    exit();
}
?>
