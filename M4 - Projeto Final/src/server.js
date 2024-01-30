require("dotenv").config()
const path = require('path');
const express = require('express')
const cookieParser = require('cookie-parser');

const app = express();


app.use(express.json());
app.use(cookieParser());

const rotasLogar = require('./login');
const rotasHome = require('./home');
const rotasLivres = require('./acessoLivre');
const rotasProdutos = require('./produto');

app.use("/airgun/acesso-livre", rotasLivres.router);
app.use("/airgun/home", rotasProdutos.router);
app.use("/airgun/home", rotasHome.router);
app.use("/airgun", rotasLogar.router);

app.use("/", (requisicao, resposta) => {
  resposta.redirect('/airgun/login');
})


app.use(express.urlencoded({
    extended: true
}))


try {
    require('dotenv').config();
} catch (error) {
    console.error('Erro ao carregar o dotenv:', error.message);
}

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta ${PORT}
    https://localhost:${PORT}`)
})