const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Conexão com banco
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'helpus_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('🎯 Conectado ao MySQL!');
});

// ✅ LOGIN DE USUÁRIO/ADMIN
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';

  db.query(sql, [email, senha], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(401).json({ mensagem: 'Credenciais inválidas' });

    const usuario = results[0];
    res.json({ nome: usuario.nome, tipo: usuario.tipo });
  });
});

// 🎫 CRIAR CHAMADO
app.post('/api/chamados', (req, res) => {
  const { nome, problema } = req.body;
  const sql = 'INSERT INTO chamados (nome, problema) VALUES (?, ?)';

  db.query(sql, [nome, problema], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, nome, problema, status: 'Aberto' });
  });
});

// 📋 LISTAR CHAMADOS
app.get('/api/chamados', (req, res) => {
  const sql = 'SELECT * FROM chamados ORDER BY criado_em DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// ✏️ ATUALIZAR STATUS DE CHAMADO
app.put('/api/chamados/:id', (req, res) => {
  const { status } = req.body;
  const sql = 'UPDATE chamados SET status = ? WHERE id = ?';

  db.query(sql, [status, req.params.id], (err, resultado) => {
    if (err) return res.status(500).send(err);
    res.json({ mensagem: 'Status atualizado com sucesso' });
  });
});

// 🗑️ EXCLUIR CHAMADO
app.delete('/api/chamados/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM chamados WHERE id = ?';

  db.query(sql, [id], (err, resultado) => {
    if (err) {
      console.error('Erro ao excluir chamado:', err);
      return res.status(500).send('Erro ao excluir chamado.');
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).send('Chamado não encontrado.');
    }

    res.status(204).send(); // Exclusão OK sem conteúdo
  });
});

// 🚀 Inicialização
app.listen(3000, () => {
  console.log('🚀 Servidor rodando em http://localhost:3000');
});
