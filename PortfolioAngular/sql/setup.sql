-- ==========================================
-- SETUP DO BANCO - PORTFÓLIO ANGULAR
-- ==========================================

-- ==========================================
-- 1. CRIA O BANCO
-- ==========================================

CREATE DATABASE IF NOT EXISTS dwii_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;


-- ==========================================
-- 2. CRIA O USUÁRIO
-- ==========================================

CREATE USER IF NOT EXISTS 'dwii_user'@'localhost'
IDENTIFIED BY 'dwii2026';


-- ==========================================
-- 3. DÁ PERMISSÃO AO USUÁRIO
-- ==========================================

GRANT ALL PRIVILEGES ON dwii_db.* TO 'dwii_user'@'localhost';

FLUSH PRIVILEGES;


-- ==========================================
-- 4. SELECIONA O BANCO
-- ==========================================

USE dwii_db;


-- ==========================================
-- 5. REMOVE TABELAS ANTIGAS
-- ==========================================

DROP TABLE IF EXISTS projetos;
DROP TABLE IF EXISTS tecnologias;


-- ==========================================
-- 6. CRIA TABELA DE PROJETOS
-- ==========================================

CREATE TABLE projetos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    tecnologias VARCHAR(255),
    link_github VARCHAR(255),
    ano INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'publicado'
);


-- ==========================================
-- 7. CRIA TABELA DE TECNOLOGIAS
-- ==========================================

CREATE TABLE tecnologias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    descricao TEXT,
    ano_criacao INT,
    status VARCHAR(20) NOT NULL DEFAULT 'ativo'
);


-- ==========================================
-- 8. INSERTS DE PROJETOS
-- ==========================================

INSERT INTO projetos
(nome, descricao, tecnologias, link_github, ano, status)
VALUES
(
    'Portfolio Pessoal',
    'Site de portfolio responsivo com PHP, PDO e MariaDB, painel admin e login.',
    'PHP, MariaDB, CSS, Git',
    'https://github.com/usuario/portfolio',
    2026,
    'publicado'
),
(
    'Sistema de Biblioteca',
    'CRUD de acervo e emprestimos, com busca e relatorios.',
    'PHP, MariaDB, Bootstrap',
    'https://github.com/usuario/biblioteca',
    2025,
    'publicado'
),
(
    'App de Tarefas',
    'Lista de tarefas com categorias, prazos e filtro por status.',
    'JavaScript, HTML, CSS',
    'https://github.com/usuario/tarefas',
    2025,
    'publicado'
),
(
    'Loja Virtual (prototipo)',
    'Catalogo de produtos com carrinho e checkout simulado.',
    'PHP, MariaDB, JavaScript',
    'https://github.com/usuario/loja',
    2024,
    'publicado'
),
(
    'API de Clima',
    'Microsservico que consome uma API publica e devolve a previsao em JSON.',
    'PHP, REST',
    'https://github.com/usuario/clima',
    2026,
    'publicado'
),
(
    'Jogo da Velha (em construcao)',
    'Jogo da velha local - ainda em desenvolvimento.',
    'JavaScript, HTML',
    NULL,
    2026,
    'rascunho'
);


-- ==========================================
-- 9. INSERTS DE TECNOLOGIAS
-- ==========================================

INSERT INTO tecnologias
(nome, categoria, descricao, ano_criacao, status)
VALUES
(
    'HTML',
    'Frontend',
    'Linguagem de marcacao para estrutura de paginas.',
    1993,
    'ativo'
),
(
    'CSS',
    'Frontend',
    'Linguagem de estilos para apresentacao visual.',
    1996,
    'ativo'
),
(
    'JavaScript',
    'Frontend',
    'Linguagem de programacao para o navegador.',
    1995,
    'ativo'
),
(
    'PHP',
    'Backend',
    'Linguagem server-side para web dinamica.',
    1994,
    'ativo'
),
(
    'MariaDB',
    'Banco de Dados',
    'SGBD relacional open-source.',
    2009,
    'ativo'
),
(
    'Git',
    'DevOps',
    'Sistema de controle de versao distribuido.',
    2005,
    'ativo'
);


-- ==========================================
-- 10. TESTES
-- ==========================================

SELECT id, nome, ano, status
FROM projetos;

SELECT id, nome, categoria, status
FROM tecnologias;