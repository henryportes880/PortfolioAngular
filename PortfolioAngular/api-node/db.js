// api-node/db.js - a conexao com o MariaDB (o conexao.php do Node)
const mysql = require('mysql2/promise');

// socketPath: o mesmo caminho local que o PHP usa quando o host e 'localhost'.
// DB_SOCKET permite usar um banco de teste isolado sem mudar o socket padrao.
// Por isso casa com o usuario 'dwii_user'@'localhost' da Aula 16.
const pool = mysql.createPool({
  socketPath: process.env.DB_SOCKET || '/run/mysqld/mysqld.sock',
  user: 'dwii_user',
  password: 'dwii2026',
  database: 'dwii_db'
});

module.exports = pool;