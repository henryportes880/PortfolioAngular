<?php
// api/projetos.php - CRUD completo do Portfólio

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require __DIR__ . '/../conexao.php';

$metodo = $_SERVER['REQUEST_METHOD'];

try {
    switch ($metodo) {

        // GET - listar ou buscar um projeto
        case 'GET':
            if (isset($_GET['id'])) {
                $stmt = $pdo->prepare(
                    "SELECT id, nome, descricao, tecnologias, link_github, ano
                     FROM projetos
                     WHERE id = ?"
                );
                $stmt->execute([$_GET['id']]);
                $resultado = $stmt->fetch();

                if (!$resultado) {
                    http_response_code(404);
                    echo json_encode(['erro' => 'Projeto nao encontrado']);
                    break;
                }

                echo json_encode($resultado);
            } else {
                $sql = "SELECT id, nome, descricao, tecnologias, link_github, ano
                        FROM projetos
                        WHERE status = 'publicado'
                        ORDER BY ano DESC, id DESC";

                $stmt = $pdo->query($sql);
                $resultado = $stmt->fetchAll();

                echo json_encode($resultado);
            }
            break;


        // POST - criar um projeto
        case 'POST':
            // POST cria: os dados vem no corpo, em JSON, e o id nasce no banco.
            $dados = json_decode(file_get_contents('php://input'), true);

            if (!$dados || empty($dados['nome'])) {
                http_response_code(400);
                echo json_encode([
                    'erro' => 'Informe pelo menos o nome do projeto'
                ]);
                break;
            }

            $sql = "INSERT INTO projetos
                    (nome, descricao, tecnologias, link_github, ano, status)
                    VALUES (?, ?, ?, ?, ?, ?)";

            $stmt = $pdo->prepare($sql);

            $stmt->execute([
                $dados['nome'],
                $dados['descricao'] ?? '',
                $dados['tecnologias'] ?? '',
                $dados['link_github'] ?? '',
                $dados['ano'] ?? date('Y'),
                $dados['status'] ?? 'publicado'
            ]);

            http_response_code(201);

            echo json_encode([
                'id' => (int) $pdo->lastInsertId()
            ]);
            break;


        // PUT - alterar um projeto
        case 'PUT':
            // PUT altera: o id vem no caminho e os dados vem no corpo.
            $dados = json_decode(file_get_contents('php://input'), true);

            if (!$dados || empty($dados['nome'])) {
                http_response_code(400);
                echo json_encode([
                    'erro' => 'Informe pelo menos o nome do projeto'
                ]);
                break;
            }

            $sql = "UPDATE projetos
                    SET nome = ?,
                        descricao = ?,
                        tecnologias = ?,
                        link_github = ?,
                        ano = ?
                    WHERE id = ?";

            $stmt = $pdo->prepare($sql);

            $stmt->execute([
                $dados['nome'],
                $dados['descricao'] ?? '',
                $dados['tecnologias'] ?? '',
                $dados['link_github'] ?? '',
                $dados['ano'] ?? date('Y'),
                $_GET['id'] ?? $dados['id'] ?? null
            ]);

            if ($stmt->rowCount() === 0) {
                $id = $_GET['id'] ?? $dados['id'] ?? null;

                $verifica = $pdo->prepare(
                    "SELECT id FROM projetos WHERE id = ?"
                );
                $verifica->execute([$id]);

                if (!$verifica->fetch()) {
                    http_response_code(404);
                    echo json_encode([
                        'erro' => 'Projeto nao encontrado'
                    ]);
                    break;
                }
            }

            echo json_encode([
                'mensagem' => 'Projeto atualizado'
            ]);
            break;


        // DELETE - apagar um projeto
        case 'DELETE':
            if (!isset($_GET['id'])) {
                http_response_code(400);
                echo json_encode([
                    'erro' => 'ID do projeto nao foi fornecido'
                ]);
                break;
            }

            $stmt = $pdo->prepare(
                "DELETE FROM projetos WHERE id = ?"
            );

            $stmt->execute([$_GET['id']]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode([
                    'erro' => 'Projeto nao encontrado'
                ]);
                break;
            }

            echo json_encode([
                'mensagem' => 'Projeto excluido com sucesso!'
            ]);
            break;


        // Método não permitido
        default:
            http_response_code(405);
            echo json_encode([
                'erro' => 'Método não permitido.'
            ]);
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