# 📌 Portfólio Full Stack - Angular, PHP & MariaDB

Este projeto é um portfólio pessoal interativo desenvolvido com **Angular**, **PHP** e **MariaDB**, com o objetivo de praticar a criação de aplicações Full Stack utilizando uma arquitetura cliente-servidor e consumo de API REST.

---

## 🚀 Sobre o projeto

O portfólio apresenta informações estruturadas e dinâmicas organizadas nas seguintes seções:

* **Início**
* **Sobre mim**
* **Projetos** (consumindo dados reais da API)
* **Catálogo de Tecnologias** (consumindo dados reais da API)
* **Contato**
* **Área de Gestão** (módulo administrativo para gerenciamento de dados)

Os dados exibidos nas telas de Projetos e Catálogo são consumidos de uma API REST desenvolvida em PHP e armazenados em um banco de dados MariaDB.

---

## ⚙️ Funcionalidades da Área de Gestão (Aula 19)

A seção de **Gestão** conta com um CRUD completo integrado à API PHP:

* **Criação (`POST`):** Cadastro de novos projetos com formulário estilizado via Angular Material.
* **Leitura (`GET`):** Listagem em tempo real de todos os projetos salvos no banco de dados.
* **Atualização (`PUT`):** Edição de projetos existentes diretamente pela interface.
* **Exclusão (`DELETE`):** Remoção de registros do banco com confirmação de segurança.

---

## 🛠️ Tecnologias utilizadas

### Front-end
* Angular (Standalone Components, Signals & Router)
* Angular Material UI
* TypeScript
* HTML5 / CSS3

### Back-end
* PHP 8.x
* PDO (PHP Data Objects)
* REST API (CORS habilitado)
* MariaDB / MySQL

---

## 📦 Ambiente de Desenvolvimento

* Node.js
* npm
* Angular CLI
* GitHub Codespaces / VS Code

---

## ▶️ Como executar o projeto

### 1. Clonar o repositório

git clone https://github.com/henryportes/PortfolioAngular.git
cd PortfolioAngular

---

## API em Node (Aula 21)

Uma segunda versao da API, em JavaScript, na pasta `api-node/`.
O contrato de `GET /api/projetos` e o mesmo do `api/projetos.php`.

Como rodar:

cd api-node
npm install
node server.js

A API sobe em http://localhost:3000. Teste com:

curl -i http://localhost:3000/api/projetos

### Aula 22: a API le do banco

Antes de subir a API, o MariaDB precisa estar de pe:

    sudo service mariadb start
    cd api-node
    node server.js

Rotas que leem do `dwii_db`:

    curl -i http://localhost:3000/api/projetos
    curl -i http://localhost:3000/api/projetos/5
    curl -i http://localhost:3000/api/tecnologias

### Aula 23: a API cria, altera e apaga

A API em uso e a de `api-node/`. Os arquivos `api/*.php` e `conexao.php` ficam no repositorio como historico do 2o trimestre.

    curl -i -X POST http://localhost:3000/api/projetos -H "Content-Type: application/json" -d '{"nome":"Projeto de teste","ano":2026}'
    curl -i -X PUT http://localhost:3000/api/projetos/7 -H "Content-Type: application/json" -d '{"nome":"Projeto de teste (editado)","ano":2026}'
    curl -i -X DELETE http://localhost:3000/api/projetos/7