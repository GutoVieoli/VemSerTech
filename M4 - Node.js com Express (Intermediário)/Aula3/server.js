const express = require('express')
const app = express();
app.use(express.json());

const rotasLocadoras = require('./locadoras/rotas');
const rotasVeiculos = require('./veiculos/rotas');

app.use("/locadoras", rotasLocadoras.router)
app.use("/veiculos", rotasVeiculos.router)


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta ${PORT}
    https://localhost:${PORT}`)
})