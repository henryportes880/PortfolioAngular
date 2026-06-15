# 📌 Portfólio Full Stack - Angular, PHP & MariaDB

Este projeto é um portfólio pessoal desenvolvido com **Angular**, **PHP** e **MariaDB**, com o objetivo de praticar a criação de aplicações Full Stack utilizando uma arquitetura cliente-servidor.

---

## 🚀 Sobre o projeto

O portfólio apresenta informações organizadas em seções como:

* Sobre mim
* Projetos
* Tecnologias
* Contato

Os dados são consumidos por uma API REST desenvolvida em PHP e armazenados em um banco de dados MariaDB.

---

## 🛠️ Tecnologias utilizadas

### Front-end

* Angular 17
* Angular Material
* TypeScript
* HTML5
* CSS3

### Back-end

* PHP
* PDO
* MariaDB

---

## 📦 Ambiente

* Node.js 20.x.x
* npm 10.x.x
* Angular CLI 17.x.x
* PHP 8.x.x
* MariaDB 10.x.x

---

## ▶️ Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://seu-repositorio-aqui.git
```

### 2. Configurar o banco de dados

Importe o arquivo `sql/setup.sql` em seu servidor MariaDB e ajuste as credenciais no arquivo `conexao.php`.

### 3. Executar a API

Na raiz do projeto, execute:

```bash
php -S localhost:8000
```

### 4. Executar o front-end

Na pasta do Angular:

```bash
npm install
ng serve
```

Acesse:

```text
http://localhost:4200
```

---

## 👨‍💻 Autor

**Henry Portes**

Projeto desenvolvido para a disciplina de **Desenvolvimento Web II** – IFPR.
