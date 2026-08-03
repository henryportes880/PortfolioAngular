<?php
// api/projetos.php - projetos PUBLICADOS do Portfolio em JSON
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

// Trata a requisicao OPTIONS (Preflight do navegador)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require __DIR__ . '/../conexao.php';

try {
    $sql = "SELECT id, nome, descricao, tecnologias, link_github, ano FROM projetos WHERE status = 'publicado' ORDER BY ano DESC, id DESC";
    $stmt = $pdo->query($sql);
    $projetos = $stmt->fetchAll();

    echo json_encode($projetos);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'erro' => 'Falha ao consultar os projetos na base de dados.',
        'detalhes' => $e->getMessage()
    ]);
}