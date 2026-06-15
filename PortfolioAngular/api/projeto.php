<?php
// api/projeto.php - busca APENAS UM projeto por ID com tratamento de erros
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require __DIR__ . '/../conexao.php';

try {
    // 1. Verifica se o ID foi passado na URL (ex: ?id=3)
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        http_response_code(400); // Bad Request (Requisição incorreta)
        echo json_encode(['erro' => 'O parametro "id" eh obrigatorio.']);
        exit;
    }

    $id = (int)$_GET['id'];

    // 2. Consulta parametrizada com prepare() para evitar SQL Injection (Segurança!)
    $sql = "SELECT id, nome, descricao, tecnologias, link_github, ano FROM projetos WHERE id = :id AND status = 'publicado'";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':id' => $id]);
    
    $projeto = $stmt->fetch(); // fetch() pega apenas uma linha, não todas

    // 3. Se o projeto não for encontrado no banco
    if (!$projeto) {
        http_response_code(404); // Not Found (Não Encontrado)
        echo json_encode(['erro' => "Projeto com o ID $id nao foi encontrado ou nao esta publicado."]);
        exit;
    }

    // 4. Se deu tudo certo, devolve o projeto encontrado
    echo json_encode($projeto);

} catch (PDOException $e) {
    // 5. Tratamento de erro caso o banco de dados falhe
    http_response_code(500); // Internal Server Error
    echo json_encode([
        'erro' => 'Falha interna no banco de dados.',
        'detalhes' => $e->getMessage() // Opcional: ajuda a debugar
    ]);
}