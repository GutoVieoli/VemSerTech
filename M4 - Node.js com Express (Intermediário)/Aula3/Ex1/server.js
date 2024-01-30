const express = require('express')
const app = express();
app.use(express.json());

const rotasUsuarios = require('./Usuarios/rotas');
const rotasLojas = require('./Lojas/rotas');

app.use("/usuarios", rotasUsuarios.router)
app.use("/lojas", rotasLojas.router)


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta ${PORT}
    https://localhost:${PORT}`)
})