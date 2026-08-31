<?php
// api/projetos.php - CRUD completo do Portfólio
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require __DIR__ . '/../conexao.php';

$metodo = $_SERVER['REQUEST_METHOD'];

try {
    switch ($metodo) {
        // 1. LER (GET)
        case 'GET':
            if (isset($_GET['id'])) {
                $stmt = $pdo->prepare("SELECT * FROM projetos WHERE id = ?");
                $stmt->execute([$_GET['id']]);
                $resultado = $stmt->fetch();
            } else {
                $sql = "SELECT id, nome, descricao, tecnologias, link_github, ano FROM projetos WHERE status = 'publicado' ORDER BY ano DESC, id DESC";
                $stmt = $pdo->query($sql);
                $resultado = $stmt->fetchAll();
            }
            echo json_encode($resultado);
            break;

        // 2. CRIAR (POST)
        case 'POST':
            $dados = json_decode(file_get_contents("php://input"), true);
            
            if (!empty($dados['nome']) && !empty($dados['descricao'])) {
                $sql = "INSERT INTO projetos (nome, descricao, tecnologias, link_github, ano, status) VALUES (?, ?, ?, ?, ?, ?)";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([
                    $dados['nome'],
                    $dados['descricao'],
                    $dados['tecnologias'] ?? '',
                    $dados['link_github'] ?? '',
                    $dados['ano'] ?? date('Y'),
                    $dados['status'] ?? 'publicado'
                ]);

                http_response_code(201);
                echo json_encode([
                    "mensagem" => "Projeto cadastrado com sucesso!",
                    "id" => $pdo->lastInsertId()
                ]);
            } else {
                http_response_code(400);
                echo json_encode(["erro" => "Nome e descrição são obrigatórios."]);
            }
            break;

        // 3. ALTERAR (PUT)
        case 'PUT':
            $dados = json_decode(file_get_contents("php://input"), true);

            if (!empty($dados['id']) && !empty($dados['nome']) && !empty($dados['descricao'])) {
                $sql = "UPDATE projetos SET nome = ?, descricao = ?, tecnologias = ?, link_github = ?, ano = ?, status = ? WHERE id = ?";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([
                    $dados['nome'],
                    $dados['descricao'],
                    $dados['tecnologias'] ?? '',
                    $dados['link_github'] ?? '',
                    $dados['ano'] ?? date('Y'),
                    $dados['status'] ?? 'publicado',
                    $dados['id']
                ]);

                echo json_encode(["mensagem" => "Projeto atualizado com sucesso!"]);
            } else {
                http_response_code(400);
                echo json_encode(["erro" => "ID, nome e descrição são obrigatórios para edição."]);
            }
            break;

        // 4. APAGAR (DELETE)
        case 'DELETE':
            if (isset($_GET['id'])) {
                $stmt = $pdo->prepare("DELETE FROM projetos WHERE id = ?");
                $stmt->execute([$_GET['id']]);

                echo json_encode(["mensagem" => "Projeto excluído com sucesso!"]);
            } else {
                http_response_code(400);
                echo json_encode(["erro" => "ID do projeto não foi fornecido."]);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(["erro" => "Método não permitido."]);
            break;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'erro' => 'Falha na operação com o banco de dados.',
        'detalhes' => $e->getMessage()
    ]);
}
?>