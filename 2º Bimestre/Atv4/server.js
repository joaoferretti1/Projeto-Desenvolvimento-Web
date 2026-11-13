const express = require('express');
const cors = require('cors');

const produtoRoutes = require('./routes/produtoRoutes');

const app = express();

app.use(express.json());
app.use(cors());

// Utilizar as rotas de produtos
app.use('/api/produtos', produtoRoutes);

const PORTA = 3000;

app.listen(PORTA, () => {
    console.log(`Servidor escutando na porta ${PORTA}`);
});