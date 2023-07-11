const express = require('express');
const armasRoutes = require('./routes/armaRoutes');

const app = express();

// Middleware para converter o corpo da requisição em JSON
app.use(express.json());

// Rotas para as armas
app.use('/armas', armasRoutes);

// Inicie o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
