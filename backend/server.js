const express = require('express');
const app = express();
const notesRoutes = require('./routes/notes');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// rotas
app.use('/notes', notesRoutes);

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
