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

git clone https://github.com/henryportes880/PortfolioAngular.git
cd PortfolioAngular

---

## API em Node — Entrega A (Aulas 21 a 24)

Correção da documentação em 16/11/2026: os exemplos agora incluem a primeira
linha HTTP e o corpo realmente recebidos. A API está em `PortfolioAngular/api-node/`
e os scripts do banco em `PortfolioAngular/sql/`, considerando a raiz deste repositório.
Os portfólios Angular e React não foram alterados nesta correção.

### Como rodar do zero

Pré-requisitos: Git, Node.js com npm e MariaDB. Os comandos abaixo partem de um
MariaDB local **novo**, com acesso administrativo via `sudo mariadb` e socket
`/run/mysqld/mysqld.sock`. `setup.sql` contém `DROP TABLE`: **não execute em um
banco com dados que deseja manter**. Para testar em um ambiente existente,
use outra instância MariaDB (por exemplo, um container sem portas publicadas)
e configure `DB_SOCKET`; não importe o setup sobre seus dados.

1. Clone e entre na raiz:

   ```sh
   git clone https://github.com/henryportes880/PortfolioAngular.git
   cd PortfolioAngular
   ```

2. Inicie o MariaDB e confira se já existe um banco antes de importar qualquer SQL:

   ```sh
   sudo service mariadb start
   sudo mariadb -e "SHOW DATABASES LIKE 'dwii_db';"
   ```

   Se o banco já existir, pare aqui e preserve-o. Os dois próximos comandos são
   para uma instância nova: o primeiro cria banco, usuário local, tabelas e dados
   de exemplo; o segundo cria a tabela de usuários, ainda sem um dono cadastrado.

   ```sh
   sudo mariadb < PortfolioAngular/sql/setup.sql
   sudo mariadb dwii_db < PortfolioAngular/sql/usuarios.sql
   ```

   `usuarios.sql` também não deve ser reaplicado se a tabela já existe. As
   credenciais locais de demonstração de `setup.sql` correspondem a `db.js`;
   não são configuração para um banco de produção.

3. Instale as dependências da API:

   ```sh
   cd PortfolioAngular/api-node
   npm install
   ```

   Com o lockfile existente, `npm ci` também funciona e foi o comando usado na
   verificação desta correção. Não versione `node_modules`.

4. Crie o usuário usando seu próprio email e uma senha nova. Em Bash, a leitura
   oculta evita gravar a senha literal no histórico; não execute com `set -x`:

   ```sh
   read -r -p 'Email do dono: ' EMAIL_DONO
   read -r -s -p 'Senha nova: ' SENHA_DONO
   printf '\n'
   node criar-usuario.js "$EMAIL_DONO" "$SENHA_DONO"
   unset SENHA_DONO EMAIL_DONO
   ```

   O formato do comando é `node criar-usuario.js <email> <senha>` (os marcadores
   devem ser substituídos, não digitados literalmente). O script grava um hash
   bcrypt, não a senha. Email duplicado viola a restrição UNIQUE; não recrie um
   usuário existente. Se reutilizou a senha anteriormente exposta nos exemplos,
   troque-a no ambiente real: remover o exemplo não remove o histórico. Nenhuma
   credencial de um ambiente existente foi alterada nesta correção.

5. Inicialize a API e mantenha esse terminal aberto:

   ```sh
   node server.js
   ```

   A API atende em `http://localhost:3000`. Use outro terminal para os exemplos.
   Para um MariaDB isolado com outro socket, use a mesma variável tanto na
   criação do usuário quanto na inicialização:

   ```sh
   export DB_SOCKET=/caminho/da/instancia-de-teste/mysqld.sock
   ```

   Sem essa variável, o comportamento anterior permanece. Não é necessário
   iniciar Angular ou React para testar a API.

### Origem das evidências

As respostas abaixo foram obtidas com `curl -i` e HTTP/1.1, em 16/11/2026, com
Node.js 24.22.1, dependências instaladas por `npm ci` e MariaDB 11.4 em container
isolado, sem rede ou portas publicadas. Importei os SQLs deste repositório em
uma instância nova, com socket em `/workspace/work/entrega-a/socket/mysqld.sock`.
Não usei nem alterei um banco de dados existente.

Criei o usuário temporário `teste.entrega-a@example.invalid` com senha aleatória;
este é um endereço de teste, não o email do dono. Só senha e token foram
substituídos por `<senha>` e `<token>` nas transcrições. Cabeçalhos adicionais
foram omitidos; status e corpos foram mantidos. Um `<token>` nos exemplos
representa o JWT válido recebido no login, exceto no teste explicitamente inválido.
Para repetir, substitua também o email pelo usuário criado no seu banco.

O login foi executado antes das escritas. As seções seguem os números das aulas,
não a ordem temporal das requisições. Exemplos repetidos na seção Aula 24 são
as mesmas capturas da mesma execução, não novas execuções. O ID 7 veio do POST
neste banco novo; em outro banco use o ID realmente retornado, nunca um ID fixo
que possa pertencer a um projeto existente. POST cria rascunho: ele não aparece
no GET público. Ao final havia novamente os seis projetos e seis tecnologias
originais do setup; somente o registro temporário foi excluído.

### Aula 21: API em Node

Entrada: `PortfolioAngular/api-node/server.js`. Express e CORS estão instalados;
a leitura pública foi verificada na seção Aula 22 abaixo.

### Aula 22: a API lê do banco

#### GET da lista sem token

```sh
curl -i -X GET http://localhost:3000/api/projetos
```

```http
HTTP/1.1 200 OK

[{"id":5,"nome":"API de Clima","descricao":"Microsservico que consome uma API publica e devolve a previsao em JSON.","tecnologias":"PHP, REST","link_github":"https://github.com/usuario/clima","ano":2026},{"id":1,"nome":"Portfolio Pessoal","descricao":"Site de portfolio responsivo com PHP, PDO e MariaDB, painel admin e login.","tecnologias":"PHP, MariaDB, CSS, Git","link_github":"https://github.com/usuario/portfolio","ano":2026},{"id":3,"nome":"App de Tarefas","descricao":"Lista de tarefas com categorias, prazos e filtro por status.","tecnologias":"JavaScript, HTML, CSS","link_github":"https://github.com/usuario/tarefas","ano":2025},{"id":2,"nome":"Sistema de Biblioteca","descricao":"CRUD de acervo e emprestimos, com busca e relatorios.","tecnologias":"PHP, MariaDB, Bootstrap","link_github":"https://github.com/usuario/biblioteca","ano":2025},{"id":4,"nome":"Loja Virtual (prototipo)","descricao":"Catalogo de produtos com carrinho e checkout simulado.","tecnologias":"PHP, MariaDB, JavaScript","link_github":"https://github.com/usuario/loja","ano":2024}]
```

#### GET por ID sem token

```sh
curl -i -X GET http://localhost:3000/api/projetos/5
```

```http
HTTP/1.1 200 OK

{"id":5,"nome":"API de Clima","descricao":"Microsservico que consome uma API publica e devolve a previsao em JSON.","tecnologias":"PHP, REST","link_github":"https://github.com/usuario/clima","ano":2026}
```

#### GET do catálogo sem token

```sh
curl -i -X GET http://localhost:3000/api/tecnologias
```

```http
HTTP/1.1 200 OK

[{"id":4,"nome":"PHP","categoria":"Backend","descricao":"Linguagem server-side para web dinamica.","ano_criacao":1994},{"id":5,"nome":"MariaDB","categoria":"Banco de Dados","descricao":"SGBD relacional open-source.","ano_criacao":2009},{"id":6,"nome":"Git","categoria":"DevOps","descricao":"Sistema de controle de versao distribuido.","ano_criacao":2005},{"id":2,"nome":"CSS","categoria":"Frontend","descricao":"Linguagem de estilos para apresentacao visual.","ano_criacao":1996},{"id":1,"nome":"HTML","categoria":"Frontend","descricao":"Linguagem de marcacao para estrutura de paginas.","ano_criacao":1993},{"id":3,"nome":"JavaScript","categoria":"Frontend","descricao":"Linguagem de programacao para o navegador.","ano_criacao":1995}]
```

#### GET rascunho sem token

```sh
curl -i -X GET http://localhost:3000/api/projetos/6
```

```http
HTTP/1.1 404 Not Found

{"erro":"Projeto nao encontrado"}
```

#### GET ID inexistente

```sh
curl -i -X GET http://localhost:3000/api/projetos/999999
```

```http
HTTP/1.1 404 Not Found

{"erro":"Projeto nao encontrado"}
```

### Aula 23: a API cria, altera e apaga

Na versão atual as três escritas exigem token; obtenha-o no login da Aula 24.
Estes exemplos usam o registro temporário criado pelo POST. O PUT devolve uma
mensagem e o DELETE não devolve JSON quando responde 204.

#### POST com token

```sh
curl -i -X POST http://localhost:3000/api/projetos -H 'Authorization: Bearer <token>' -H 'Content-Type: application/json' -d '{"nome":"Projeto de teste Entrega A","descricao":"Registro temporario para validar o CRUD.","tecnologias":"Node, MariaDB","link_github":"","ano":2026}'
```

```http
HTTP/1.1 201 Created

{"id":7}
```

#### PUT com token

```sh
curl -i -X PUT http://localhost:3000/api/projetos/7 -H 'Authorization: Bearer <token>' -H 'Content-Type: application/json' -d '{"nome":"Projeto de teste Entrega A (editado)","descricao":"Registro temporario para validar o CRUD.","tecnologias":"Node, MariaDB","link_github":"","ano":2026}'
```

```http
HTTP/1.1 200 OK

{"mensagem":"Projeto atualizado"}
```

#### DELETE com token

```sh
curl -i -X DELETE http://localhost:3000/api/projetos/7 -H 'Authorization: Bearer <token>'
```

```http
HTTP/1.1 204 No Content

```

Sem corpo na resposta (zero bytes).

#### POST com token e sem nome

```sh
curl -i -X POST http://localhost:3000/api/projetos -H 'Authorization: Bearer <token>' -H 'Content-Type: application/json' -d '{}'
```

```http
HTTP/1.1 400 Bad Request

{"erro":"Informe pelo menos o nome do projeto"}
```

#### PUT com token e sem nome

```sh
curl -i -X PUT http://localhost:3000/api/projetos/7 -H 'Authorization: Bearer <token>' -H 'Content-Type: application/json' -d '{}'
```

```http
HTTP/1.1 400 Bad Request

{"erro":"Informe pelo menos o nome do projeto"}
```

#### PUT ID inexistente

```sh
curl -i -X PUT http://localhost:3000/api/projetos/999999 -H 'Authorization: Bearer <token>' -H 'Content-Type: application/json' -d '{"nome":"Projeto de teste Entrega A","descricao":"Registro temporario para validar o CRUD.","tecnologias":"Node, MariaDB","link_github":"","ano":2026}'
```

```http
HTTP/1.1 404 Not Found

{"erro":"Projeto nao encontrado"}
```

#### DELETE ID já removido

```sh
curl -i -X DELETE http://localhost:3000/api/projetos/7 -H 'Authorization: Bearer <token>'
```

```http
HTTP/1.1 404 Not Found

{"erro":"Projeto nao encontrado"}
```

#### GET do rascunho criado

```sh
curl -i -X GET http://localhost:3000/api/projetos/7
```

```http
HTTP/1.1 404 Not Found

{"erro":"Projeto nao encontrado"}
```

### Aula 24: a tranca

Os sete testes solicitados estão abaixo. No login incorreto, `<senha>` representa
uma senha diferente da cadastrada. A senha errada e o email inexistente recebem
a mesma mensagem, evitando revelar pela resposta se aquele email está cadastrado.
A validade atual permanece a do código das aulas (`2h`); não implementei uma
escolha de validade de nível B nesta correção documental.

#### Login correto

```sh
curl -i -X POST http://localhost:3000/api/login -H 'Content-Type: application/json' -d '{"email":"teste.entrega-a@example.invalid","senha":"<senha>"}'
```

```http
HTTP/1.1 200 OK

{"token":"<token>"}
```

#### Login incorreto (senha errada)

```sh
curl -i -X POST http://localhost:3000/api/login -H 'Content-Type: application/json' -d '{"email":"teste.entrega-a@example.invalid","senha":"<senha>"}'
```

```http
HTTP/1.1 401 Unauthorized

{"erro":"Email ou senha invalidos"}
```

#### POST sem token

```sh
curl -i -X POST http://localhost:3000/api/projetos -H 'Content-Type: application/json' -d '{"nome":"Projeto de teste Entrega A","descricao":"Registro temporario para validar o CRUD.","tecnologias":"Node, MariaDB","link_github":"","ano":2026}'
```

```http
HTTP/1.1 401 Unauthorized

{"erro":"Token ausente"}
```

#### POST com token

```sh
curl -i -X POST http://localhost:3000/api/projetos -H 'Authorization: Bearer <token>' -H 'Content-Type: application/json' -d '{"nome":"Projeto de teste Entrega A","descricao":"Registro temporario para validar o CRUD.","tecnologias":"Node, MariaDB","link_github":"","ano":2026}'
```

```http
HTTP/1.1 201 Created

{"id":7}
```

#### PUT com token

```sh
curl -i -X PUT http://localhost:3000/api/projetos/7 -H 'Authorization: Bearer <token>' -H 'Content-Type: application/json' -d '{"nome":"Projeto de teste Entrega A (editado)","descricao":"Registro temporario para validar o CRUD.","tecnologias":"Node, MariaDB","link_github":"","ano":2026}'
```

```http
HTTP/1.1 200 OK

{"mensagem":"Projeto atualizado"}
```

#### DELETE sem token

```sh
curl -i -X DELETE http://localhost:3000/api/projetos/7
```

```http
HTTP/1.1 401 Unauthorized

{"erro":"Token ausente"}
```

#### GET da lista sem token

```sh
curl -i -X GET http://localhost:3000/api/projetos
```

```http
HTTP/1.1 200 OK

[{"id":5,"nome":"API de Clima","descricao":"Microsservico que consome uma API publica e devolve a previsao em JSON.","tecnologias":"PHP, REST","link_github":"https://github.com/usuario/clima","ano":2026},{"id":1,"nome":"Portfolio Pessoal","descricao":"Site de portfolio responsivo com PHP, PDO e MariaDB, painel admin e login.","tecnologias":"PHP, MariaDB, CSS, Git","link_github":"https://github.com/usuario/portfolio","ano":2026},{"id":3,"nome":"App de Tarefas","descricao":"Lista de tarefas com categorias, prazos e filtro por status.","tecnologias":"JavaScript, HTML, CSS","link_github":"https://github.com/usuario/tarefas","ano":2025},{"id":2,"nome":"Sistema de Biblioteca","descricao":"CRUD de acervo e emprestimos, com busca e relatorios.","tecnologias":"PHP, MariaDB, Bootstrap","link_github":"https://github.com/usuario/biblioteca","ano":2025},{"id":4,"nome":"Loja Virtual (prototipo)","descricao":"Catalogo de produtos com carrinho e checkout simulado.","tecnologias":"PHP, MariaDB, JavaScript","link_github":"https://github.com/usuario/loja","ano":2024}]
```

#### Login com email inexistente

```sh
curl -i -X POST http://localhost:3000/api/login -H 'Content-Type: application/json' -d '{"email":"inexistente@example.invalid","senha":"<senha>"}'
```

```http
HTTP/1.1 401 Unauthorized

{"erro":"Email ou senha invalidos"}
```

#### Login sem campos

```sh
curl -i -X POST http://localhost:3000/api/login -H 'Content-Type: application/json' -d '{}'
```

```http
HTTP/1.1 400 Bad Request

{"erro":"Informe email e senha"}
```

#### PUT sem token

```sh
curl -i -X PUT http://localhost:3000/api/projetos/7 -H 'Content-Type: application/json' -d '{"nome":"Projeto de teste Entrega A","descricao":"Registro temporario para validar o CRUD.","tecnologias":"Node, MariaDB","link_github":"","ano":2026}'
```

```http
HTTP/1.1 401 Unauthorized

{"erro":"Token ausente"}
```

#### POST com token inválido

```sh
curl -i -X POST http://localhost:3000/api/projetos -H 'Authorization: Bearer <token>' -H 'Content-Type: application/json' -d '{"nome":"Projeto de teste Entrega A","descricao":"Registro temporario para validar o CRUD.","tecnologias":"Node, MariaDB","link_github":"","ano":2026}'
```

```http
HTTP/1.1 401 Unauthorized

{"erro":"Token invalido ou expirado"}
```

### Falha do banco em JSON

Desliguei somente o container de teste para executar esta requisição. O caminho
na mensagem é do ambiente de teste. Depois reiniciei o banco e confirmei que o
GET voltou a responder 200. Não desligue um banco compartilhado para repetir.

#### GET com banco de teste desligado

```sh
curl -i http://localhost:3000/api/projetos
```

```http
HTTP/1.1 500 Internal Server Error

{"erro":"Falha no servidor: connect ENOENT /workspace/work/entrega-a/socket/mysqld.sock"}
```

### Evidência do armazenamento de senha

Consulta realmente executada no banco de teste (hash completo não publicado):

```sql
SELECT id, email, LEFT(senha_hash, 4) AS prefixo_bcrypt,
       CHAR_LENGTH(senha_hash) AS caracteres_hash
FROM usuarios;
```

```text
id  email                            prefixo_bcrypt  caracteres_hash
1   teste.entrega-a@example.invalid   $2b$            60
```

O login correto confirma a comparação com o hash. A criação usa `bcrypt.hash`
em `criar-usuario.js`, linhas 13–14; o login usa `bcrypt.compare` em `server.js`,
linha 91. A tabela tem `senha_hash CHAR(60)` em `sql/usuarios.sql`, nunca uma
coluna para armazenar a senha em texto.

### Rotas, verbos e token

Todos os caminhos de arquivos de código nesta autoavaliação partem de
`PortfolioAngular/`.

| Rota | Verbo | Token obrigatório | Resultado principal |
| --- | --- | --- | --- |
| `/api/login` | POST | Não | 200 com token; 400 sem campos; 401 credenciais inválidas |
| `/api/projetos` | GET | Não | 200, só publicados |
| `/api/projetos/:id` | GET | Não | 200 publicado ou 404 em JSON |
| `/api/projetos` | POST | Sim | 201 com id; 400 sem nome |
| `/api/projetos/:id` | PUT | Sim | 200 ou 404; 400 sem nome |
| `/api/projetos/:id` | DELETE | Sim | 204 sem corpo ou 404 |
| `/api/tecnologias` | GET | Não | 200, só ativos |

Escrita sem token responde 401 antes de consultar o banco. O middleware
`autenticar` é único (`api-node/server.js`, linhas 23–37), com `jwt.verify` e
`next()`, aplicado ao POST, PUT e DELETE nas linhas 110, 140 e 170. As consultas
que recebem dados do cliente usam `?` e `pool.execute`, inclusive login e criação
do usuário. Os SELECTs de lista são SQL fixo, sem entrada do cliente.

### O que esta API ainda não faz

- Não oferece POST, PUT ou DELETE para `/api/tecnologias`; o catálogo é somente leitura.
- Não oferece leitura autenticada de todos os projetos (incluindo rascunhos) em `/api/projetos/todos`.

O segredo JWT ainda está no código e não pode ser tratado como segredo em produção:
qualquer leitor do repositório pode conhecê-lo. A Aula 29 prevê movê-lo para `.env`,
fora do versionamento; ao migrar é necessário usar um segredo novo. Essa migração
não foi antecipada como parte desta correção.

### Autoavaliação — Entrega A

Espero **C**, com base nos requisitos visíveis nos prints e nas evidências abaixo.
Não reivindico B ou A, e esta correção não cria funcionalidades desses níveis.
O conceito final é o menor dos três critérios; a decisão cabe ao professor.

| Critério | C: evidência no estado atual | B: o que falta | A: o que falta |
| --- | --- | --- | --- |
| 1. Cinco operações | `api-node/server.js`: GETs nas linhas 45–69; POST 110–137 (201/id e 400 sem nome); PUT 140–167 (200/404 por `affectedRows`); DELETE 170–185 (204/404). `express.json()` na linha 20, SQL com `?`, `try/catch` e 500 JSON. Respostas reais nas seções Aula 22, Aula 23 e Falha do banco em JSON. | Escritas protegidas do catálogo de tecnologias. | Além de B, GET `/api/projetos/todos` protegido, antes de `/:id`, incluindo rascunhos. |
| 2. Tranca | `sql/usuarios.sql`; `api-node/criar-usuario.js`, linhas 13–14; `api-node/server.js`, linhas 23–37 e 72–107. Sete testes na seção Aula 24, mais 400, token inválido e PUT sem token. Hash verificado por SQL acima. | Dono com email próprio e senha privada definida por ele; validade diferente de 2h com justificativa; mensagens próprias. O usuário desta execução é temporário e não comprova escolha pessoal do dono. | Também depende de B; middleware único já existe. A explicação sobre o segredo e a Aula 29 consta acima. |
| 3. README e histórico | Como rodar do zero na ordem banco → setup.sql → usuarios.sql → dependências → criar-usuario.js → server.js. Cada curl com status e corpo (ou indicação de ausência). `api-node/.gitignore` já contém `node_modules/`, sem dependências versionadas. Os quatro commits originais estão listados abaixo. | Sete testes e dois limites já documentados; para B geral ainda faltam os requisitos dos critérios 1 e 2. | Tabela rota × verbo × token e nota do segredo já documentadas; para A geral faltam B e a leitura protegida. |

Histórico existente, consultado com `git log --oneline --grep='Aula 2[1-4]'`:

- `17e041f` — Aula 21: API do Portfolio em Node, GET /api/projetos com cors
- `e72b118` — Aula 22: API em Node le projetos e catalogo do MariaDB com mysql2
- `3b5b73d` — Aula 23: API em Node cria, altera e apaga projetos com POST, PUT e DELETE
- `e2aa48c` — Aula 24: API em Node com login, token JWT e middleware autenticar nas rotas de escrita

Esses commits são anteriores à correção. Não foram recriados nem tiveram datas
alteradas. O link público da raiz foi consultado sem autenticação e respondeu 200.
`git ls-files '*node_modules*'` não retornou arquivos.

Limite da revisão: os prints informam os principais status do contrato da Aula 19,
mas não trazem sua tabela completa de entradas e respostas. Para comparar o contrato
integralmente, falta o trecho da Aula 19 que define os campos obrigatórios/opcionais,
as validações de `nome`, `ano` e `status` no POST/PUT e os formatos de resposta.
Os testes aqui comprovam o contrato explicitamente visível nos prints; não afirmam
validações adicionais que não foram especificadas ali.

---

### Aula 25: o Portfolio em React

O front novo nasce em `portfolio-react/` (Vite + React), ao lado do Angular. Para rodar:

    cd portfolio-react
    npm install
    npm run dev

A tela abre na porta 5173. Por enquanto os projetos sao fixos no `src/App.jsx`; a Aula 27 os traz da API.

### Aula 26: estado, lista e formulario

Os projetos sairam do `App.jsx` e moram em `src/projetos.js`. A tela os desenha com `map`.

O formulario de contato (`src/Contato.jsx`) guarda o que a pessoa digita no estado, com `useState`.
Ele ainda nao envia nada: avisa e limpa os campos. O envio de verdade chega com a API.

### Aula 27: o Portfólio com dados reais

A atividade é um **checkpoint sem envio nem nota pelo AVA**. O registro é o
commit no GitHub, conforme os materiais da Aula 27. A avaliação anônima da aula
é um recurso separado; não foi preenchida por esta implementação.

#### O que foi implementado

- `portfolio-react/src/api.js` centraliza a URL pública da porta 3000, sem barra
  final. O endereço é o já usado pelos serviços deste mesmo portfólio:
  `https://stunning-robot-4j4rwr9vjvq43qqj7-3000.app.github.dev`.
  Os GETs públicos de projetos e tecnologias responderam 200 em 16/11/2026.
  A consulta aos detalhes do Codespace pela integração retornou 403; a
  confirmação disponível foi pelos serviços existentes e pelas respostas públicas,
  não por acesso ao painel PORTS.
- `App.jsx` começa com `projetos = []`. O `useEffect` com dependências `[]`
  chama a função `buscarProjetos`, que faz `fetch` de `/api/projetos`, confere
  `resposta.ok` antes de `.json()` e preenche o estado usado pelo `map` dos
  `CardProjeto`, mantendo `key={p.id}` e os campos dos cards.
- Estados `carregando` e `erro` mostram “Carregando projetos...” e aviso em
  vermelho. O `finally` encerra a espera tanto em sucesso quanto em falha.
  Uma lista vazia tem mensagem própria; uma resposta que não seja uma lista
  produz erro em vez de quebrar o `map`.
- `Catalogo.jsx` busca `/api/tecnologias` em um efeito com `[]`, com seus próprios
  estados de carregamento e erro. A lista `ul` mostra nome e categoria, com
  `key={tecnologia.id}`. O catálogo fica entre projetos e contato e reaproveita
  a paleta e as medidas do layout, com CSS específico para seus itens.
- Os efeitos cancelam os pedidos ao sair da tela com `AbortController`. No
  desenvolvimento, o `StrictMode` verifica montagem/limpeza novamente; isso
  pode gerar pedidos cancelados na aba Network, sem um ciclo infinito de buscas.
- `src/projetos.js` foi removido conforme o Checkpoint. A tela exibe o que a API
  retorna, sem lista fixa ou fallback. Os quatro registros da Aula 26 permanecem
  no histórico (`4014097:portfolio-react/src/projetos.js`); não foram migrados
  nem apagados do banco. Na verificação, a API tinha sete projetos publicados,
  diferentes dos quatro antigos do front, e seis tecnologias.
- O visual anterior, o componente dos cards, o formulário local de contato,
  Angular, API, SQLs e dependências foram preservados.

#### Como iniciar API e front no Codespace

Use dois terminais, ambos inicialmente na **raiz do repositório**. O banco já
configurado nas aulas anteriores deve ser preservado: não reimporte `setup.sql`,
pois ele contém `DROP TABLE`. Para uma instalação nova, veja o passo a passo da
seção “Como rodar do zero” da Entrega A acima.

Terminal da API:

```sh
sudo service mariadb start
cd PortfolioAngular/api-node
npm ci
node server.js
```

A conexão padrão usa o socket local configurado em `db.js`. Deixe a API em
execução. No painel **PORTS**, confira a porta **3000** como **Public** e copie
seu endereço encaminhado. Se o Codespace mudou, atualize somente a constante
em `portfolio-react/src/api.js`, sem barra no final. A URL pública não deve
pedir login nem devolver uma página HTML.

Terminal do front, partindo novamente da raiz:

```sh
cd portfolio-react
npm ci
npm run dev -- --host 0.0.0.0
```

Abra a porta 5173. O front deve mostrar os registros que a sua API retornar,
não necessariamente quatro cards. Os GETs públicos não precisam de token.

Para diagnosticar no Codespace, use um terceiro terminal:

```sh
curl -i http://localhost:3000/api/projetos
curl -i http://localhost:3000/api/tecnologias
```

Esses comandos são instruções de verificação no Codespace, não transcrições
novas de resultados. Primeiro confira a API; depois Console/Network do navegador;
por último, o estado do componente. Se localmente funciona e a URL pública não,
confira a visibilidade Public da porta 3000 e se o endereço ainda corresponde
ao Codespace atual.

#### Testes realizados nesta implementação

Verificação em 16/11/2026, no ambiente de testes:

- `npm run build` e `npm run lint`: concluídos sem falhas.
- `curl` nas duas rotas públicas: HTTP 200 com JSON e CORS permitindo a leitura.
- Chromium/Playwright em 1440, 390 e 320 px: nomes dos sete cards e nomes/categorias
  das seis tecnologias conferidos contra as respostas reais da API; sem avisos
  de `key`, erros de JavaScript ou rolagem horizontal. Capturas desktop e celular
  inspecionadas. Navegação e formulário local (contador, aviso, limpeza dos três
  campos e ausência de novas buscas ao digitar) conferidos.
- Respostas reais atrasadas no teste: as mensagens de carregamento aparecem e
  somem quando os dados chegam.
- HTTP 404 real: o transporte do teste direcionou os pedidos para a rota
  inexistente `/api/projeto` da mesma API. A tela mostrou “a API respondeu 404”,
  sem tentar converter o HTML em JSON e sem manter o carregamento.
- Conexão recusada **simulada no navegador**: projetos e catálogo mostraram
  aviso vermelho e encerraram a espera. Também foram testadas, com respostas
  artificiais explícitas, lista vazia e JSON com formato incorreto.
- Falha somente nos projetos: o catálogo continuou carregando seus dados reais,
  demonstrando que os estados são independentes.

**Limite do ambiente de teste:** o Chromium direto recusou o certificado do
proxy do ambiente (`ERR_CERT_AUTHORITY_INVALID`), embora o `curl` e o cliente HTTP
do Playwright alcançassem a API com a CA configurada. Nos testes com dados reais,
o cliente HTTP do Playwright fez os GETs públicos e encaminhou suas respostas
originais ao navegador; não foram usados dados fixos nem desativada a validação
TLS. Sem esse transporte de teste, o front mostrou corretamente “Failed to fetch”
para as duas listas. Essa adaptação existe apenas nos testes, fora do repositório.

Não foi possível parar a API **no Codespace** pela integração (acesso aos detalhes
retornou 403). Portanto, não afirmo ter feito o desligamento remoto real. Para
conferi-lo no seu navegador: use Ctrl+C no terminal da API, recarregue o front,
confirme os dois avisos vermelhos e a ausência de “Carregando”; depois execute
`node server.js` no mesmo terminal e recarregue. A retomada deve mostrar os dados.

## Aula 28

### Como rodar do zero

Use Node.js 24 e dois terminais abertos na raiz do repositório.

1. **Banco.** Inicie o MariaDB e verifique se `dwii_db` já existe.

   ```sh
   sudo service mariadb start
   sudo mariadb -e "SHOW DATABASES LIKE 'dwii_db';"
   ```

   Em uma instância nova, importe primeiro a estrutura e os dados de exemplo e,
   depois, a tabela de usuários. O `setup.sql` contém `DROP TABLE`. Se o banco
   já estiver configurado, use os dados existentes. Importe `usuarios.sql`
   apenas se a tabela `usuarios` ainda não existir.

   ```sh
   sudo mariadb < PortfolioAngular/sql/setup.sql
   sudo mariadb dwii_db < PortfolioAngular/sql/usuarios.sql
   ```

2. **API.** Instale as dependências, crie o usuário local se necessário e suba
   o servidor. Os valores abaixo são fictícios. Para criar seu usuário, informe
   seu e-mail e uma senha própria na leitura do terminal.

   ```sh
   cd PortfolioAngular/api-node
   npm install
   read -r -p 'E-mail (exemplo gestao@example.test): ' EMAIL_GESTAO
   read -r -s -p 'Senha (exemplo Senha-Ficticia-28): ' SENHA_GESTAO
   printf '\n'
   node criar-usuario.js "$EMAIL_GESTAO" "$SENHA_GESTAO"
   unset EMAIL_GESTAO SENHA_GESTAO
   node server.js
   ```

3. **Porta 3000.** No painel **PORTS** do Codespace, torne a porta **3000**
   **Public** e copie o endereço encaminhado. A URL seguida de
   `/api/projetos` deve devolver JSON no navegador.
4. **Endereço do React.** Confira o endereço em
   `portfolio-react/src/api.js`, sem barra final. Para testar com navegador e
   API na mesma máquina, use a variável `VITE_API_URL=http://localhost:3000`
   ao iniciar o Vite.
5. **React.** Em outro terminal, partindo da raiz, instale e inicie o front.
   Abra a porta **5173**.

   ```sh
   cd portfolio-react
   npm install
   npm run dev -- --host 0.0.0.0
   ```

### Rotas

- `/` mostra o portfólio, os projetos publicados, o catálogo e o formulário de contato.
- `/gestao` mostra o login ou a área para cadastrar, editar e excluir projetos publicados.
- `*` mostra a página de endereço não encontrado, com um link para o Início.

### Tela × pedido à API × precisa de token

| Tela | Pedido à API | Precisa de token |
| --- | --- | --- |
| Início e Gestão, lista de projetos publicados | `GET /api/projetos` | Não |
| Início, catálogo | `GET /api/tecnologias` | Não |
| Gestão, login | `POST /api/login` | Não |
| Gestão, cadastrar e publicar | `POST /api/projetos` | Sim |
| Gestão, editar | `PUT /api/projetos/:id` | Sim |
| Gestão, excluir | `DELETE /api/projetos/:id` | Sim |
| Endereço não encontrado | Nenhum | — |

### O que este front ainda não faz

- O formulário de contato só simula o envio na página.
- A gestão usa a lista pública de projetos. Rascunhos criados por outros
  clientes ficam fora dessa lista, e a tela não oferece controle de status.

### Proteção das escritas

A API valida o token recebido em cada cadastro, edição e exclusão antes de
alterar o banco. Ocultar a gestão controla apenas o que aparece na interface.
Se uma escrita retornar 401, o React limpa a sessão e pede um novo login.

### Verificação da Aula 28

- Chromium com a API Node e um MariaDB isolado. Foram conferidos o acesso
  direto às rotas, o F5, a navegação pelo menu e a página de endereço não
  encontrado. Login incorreto mostrou a mensagem da API. Login correto
  persistiu após F5, e Sair removeu o token.
- Cadastro com cinco campos publicado no Início sem F5, edição com
  formulário preenchido, exclusão e mensagem de recusa da API. Para POST,
  PUT e DELETE, um token inválido inserido no navegador provocou 401 real
  da API, com retorno ao login e limpeza do armazenamento.
- Listas vazias conferidas com o banco isolado sem projetos publicados.
  Ao parar a API local, projetos e catálogo exibiram seus próprios erros.
  Layout em 320 e 390 px sem rolagem horizontal. Build e lint concluídos.
- A porta pública do Codespace respondeu HTTP 200 aos dois GETs. O
  Chromium do ambiente de teste recusou o certificado do proxy. As listas
  também foram conferidas no navegador com as respostas JSON reais
  encaminhadas pelo teste. Os testes de escrita usaram apenas o banco isolado.

Usei inteligência artificial para auxiliar na implementação das rotas e da gestão em React, nos testes com a API e o MariaDB e na revisão das instruções e evidências no README.
