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

```bash
git clone [https://github.com/henryportes/PortfolioAngular.git](https://github.com/henryportes/PortfolioAngular.git)
cd PortfolioAngular