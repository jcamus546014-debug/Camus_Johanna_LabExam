<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');
    
    if (empty($username) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Username and password cannot be empty']);
        exit();
    }
    
    // Check hardcoded admin account
    if ($username === 'admin' && $password === 'password123') {
        echo json_encode(['success' => true, 'message' => 'Login successful!']);
        exit();
    }
    
    // Check registered users
    $file = 'users.json';
    if (file_exists($file)) {
        $users = json_decode(file_get_contents($file), true);
        
        foreach ($users as $user) {
            if ($user['username'] === $username && password_verify($password, $user['password'])) {
                echo json_encode(['success' => true, 'message' => 'Login successful!']);
                exit();
            }
        }
    }
    
    echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
    exit();
}
?>
