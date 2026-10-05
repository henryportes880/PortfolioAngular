// api-node/server.js - a API do Portfolio em Node (Aula 22)

const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORTA = 3000;

// Permite que o Angular acesse a API Node
app.use(cors());

// Permite receber dados em JSON
app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
  res.send('API do Portfolio em Node: no ar');
});

// O mesmo SELECT do api/projetos.php: so os publicados, do mais novo ao mais antigo.
app.get('/api/projetos', async (req, res) => {
  try {
    const sql = "SELECT id, nome, descricao, tecnologias, link_github, ano FROM projetos WHERE status = 'publicado' ORDER BY ano DESC, id";
    const [projetos] = await pool.query(sql);
    res.json(projetos);
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
  }
});

// Um projeto pelo id. O ? e o mesmo do prepare do PHP: o valor nunca entra na string.
app.get('/api/projetos/:id', async (req, res) => {
  try {
    const sql = "SELECT id, nome, descricao, tecnologias, link_github, ano FROM projetos WHERE id = ? AND status = 'publicado'";
    const [linhas] = await pool.execute(sql, [req.params.id]);

    if (linhas.length === 0) {
      return res.status(404).json({ erro: 'Projeto nao encontrado' });
    }

    res.json(linhas[0]);
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
  }
});

// POST cria um novo projeto.
app.post('/api/projetos', async (req, res) => {
  try {
    // POST cria: os dados vem no corpo, em JSON, e o id nasce no banco.
    const dados = req.body;

    if (!dados || !dados.nome) {
      return res.status(400).json({
        erro: 'Informe pelo menos o nome do projeto'
      });
    }

    const sql = `
      INSERT INTO projetos (nome, descricao, tecnologias, link_github, ano, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [resultado] = await pool.execute(sql, [
      dados.nome,
      dados.descricao || '',
      dados.tecnologias || '',
      dados.link_github || '',
      dados.ano || new Date().getFullYear(),
      dados.status || 'publicado'
    ]);

    res.status(201).json({
      id: resultado.insertId
    });

  } catch (erro) {
    res.status(500).json({
      erro: 'Falha no servidor: ' + erro.message
    });
  }
});

// PUT altera: o id vem no caminho (qual projeto) e os dados no corpo (o que gravar).
app.put('/api/projetos/:id', async (req, res) => {
  try {
    const dados = req.body;
    if (!dados || !dados.nome) {
      return res.status(400).json({ erro: 'Informe pelo menos o nome do projeto' });
    }
    const sql = 'UPDATE projetos SET nome = ?, descricao = ?, tecnologias = ?, link_github = ?, ano = ? WHERE id = ?';
    const [resultado] = await pool.execute(sql, [
      dados.nome,
      dados.descricao ?? '',
      dados.tecnologias ?? '',
      dados.link_github ?? '',
      dados.ano ?? new Date().getFullYear(),
      req.params.id
    ]);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Projeto nao encontrado' });
    }
    res.json({ mensagem: 'Projeto atualizado' });
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
  }
});

// DELETE apaga: so precisa do id. Nao ha corpo no pedido, e a resposta tambem nao tem.
app.delete('/api/projetos/:id', async (req, res) => {
  try {
    const [resultado] = await pool.execute('DELETE FROM projetos WHERE id = ?', [req.params.id]);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Projeto nao encontrado' });
    }
    res.status(204).end();
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
  }
});

// O catalogo, com o SELECT do api/tecnologias.php.
app.get('/api/tecnologias', async (req, res) => {
  try {
    const sql = "SELECT id, nome, categoria, descricao, ano_criacao FROM tecnologias WHERE status = 'ativo' ORDER BY categoria, nome";
    const [tecnologias] = await pool.query(sql);
    res.json(tecnologias);
  } catch (erro) {
    res.status(500).json({ erro: 'Falha no servidor: ' + erro.message });
  }
});

// Inicia o servidor
app.listen(PORTA, () => {
  console.log('API no ar em http://localhost:' + PORTA);
});