const express = require('express');
const router = express.Router();
const db = require('../db');

// Buscar todas as anotações
router.get('/', (req, res) => {
  db.query('SELECT * FROM anotacoes', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Buscar anotações de um dia específico
router.get('/:dia', (req, res) => {
  const { dia } = req.params;

  db.query(
    'SELECT * FROM anotacoes WHERE dia_semana = ?',
    [dia],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});

// Criar nova anotação
router.post('/', (req, res) => {
  const { dia_semana, conteudo } = req.body;

  db.query(
    'INSERT INTO anotacoes (dia_semana, conteudo) VALUES (?, ?)',
    [dia_semana, conteudo],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, dia_semana, conteudo });
    }
  );
});

// Atualizar anotação
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { dia_semana, conteudo } = req.body;

  db.query(
    'UPDATE anotacoes SET dia_semana = ?, conteudo = ? WHERE id = ?',
    [dia_semana, conteudo, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Atualizado com sucesso!' });
    }
  );
});

// Deletar anotação
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM anotacoes WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Anotação removida!' });
  });
});

module.exports = router;
