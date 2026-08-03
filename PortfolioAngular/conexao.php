<?php
// conexao.php - conexao PDO com o MariaDB (reutilizavel)
$host    = 'localhost';
$db      = 'dwii_db';
$user    = 'dwii_user';
$pass    = 'dwii2026';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$opcoes = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $opcoes);
} catch (PDOException $e) {
    // Retorna a mensagem do banco em formato JSON em vez de quebrar com Erro 500
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'erro' => 'Falha ao conectar a base de dados MariaDB.',
        'detalhes' => $e->getMessage()
    ]);
    exit; // Interrompe o script aqui para nao executar queries sem conexao
}