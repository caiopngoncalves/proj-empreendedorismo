// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importando o pacote cors
const db = require('./db');

const app = express();
const port = 3000;

app.use(cors()); // Adicionando o middleware cors
app.use(bodyParser.json());

let activeUser = null;

// Rotas para Usuários
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ users: rows });
  });
});

app.post('/users', (req, res) => {
  const { name, phone, cpf, email } = req.body;
  db.run(
    'INSERT INTO users (name, phone, cpf, email) VALUES (?, ?, ?, ?)',
    [name, phone, cpf, email],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

app.post('/login', (req, res) => {
  const { email, cpf } = req.body;

  // Verificar no banco de dados se o usuário existe
  db.get('SELECT * FROM users WHERE email = ? AND cpf = ?', [email, cpf], (err, row) => {
      if (err) {
          console.error('Erro ao buscar usuário no banco de dados:', err);
          res.status(500).json({ success: false, message: 'Erro interno' });
          return;
      }

      if (row) {
          // Define o usuário ativo
          console.log(row)
          activeUser = { id: row.id, email, cpf };
          res.json({ success: true });
      } else {
        console.log('Credenciais inválidas')
          res.json({ success: false, message: 'Credenciais inválidas' });
      }
  });
});

// Rota para obter informações do usuário ativo
app.get('/active-user', (req, res) => {
  res.json({ activeUser });
});

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  // Verifique se o ID é válido (pode variar dependendo de como você está gerenciando IDs)
  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: 'ID de usuário inválido' });
  }

  // Execute a consulta SQL para excluir o usuário pelo ID
  db.run('DELETE FROM users WHERE id = ?', [userId], function (err) {
    if (err) {
      console.error('Erro ao excluir usuário:', err);
      return res.status(500).json({ error: 'Erro interno ao excluir usuário' });
    }

    // Verifique se algum usuário foi afetado pela exclusão
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Responda com sucesso
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  });
});

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;

  // Verifique se o ID é válido (pode variar dependendo de como você está gerenciando IDs)
  if (!bookId || isNaN(bookId)) {
    return res.status(400).json({ error: 'ID de livro inválido' });
  }

  // Execute a consulta SQL para excluir o livro pelo ID
  db.run('DELETE FROM books WHERE id = ?', [bookId], function (err) {
    if (err) {
      console.error('Erro ao excluir livro:', err);
      return res.status(500).json({ error: 'Erro interno ao excluir livro' });
    }

    // Verifique se algum livro foi afetado pela exclusão
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    // Responda com sucesso
    res.status(200).json({ message: 'Livro excluído com sucesso' });
  });
});

// Rotas para Livros
app.get('/books', (req, res) => {
  db.all('SELECT * FROM books', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ books: rows });
  });
});

app.post('/books', (req, res) => {
  const { title, synopsis, publication_year, author, price, photo } = req.body;
  
  let sql = 'INSERT INTO books (title, synopsis, publication_year, author, price';
  let values = 'VALUES (?, ?, ?, ?, ?';
  let params = [title, synopsis, publication_year, author, price];

  // Adicionar a foto à consulta se estiver presente
  if (photo) {
    sql += ', photo';
    values += ', ?';
    params.push(Buffer.from(photo, 'base64'));
  }

  sql += `) ${values})`;

  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});
