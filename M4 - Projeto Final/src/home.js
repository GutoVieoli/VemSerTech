const express = require('express');
const path = require('path');
const dbUser = require('../models/user');
const cookieParser = require("cookie-parser");
const { gerarToken, autenticacao } = require('./autenticacao');


const router = express.Router();

router.use(cookieParser());
router.use(express.json());

router.use(express.urlencoded({
    extended: true
}))


router.get('/listagemProdutos', (requisicao, resposta, next) => {
    resposta.sendFile( path.join(__dirname, '../public/static/listagemProdutos.html') );
});

router.use('/', autenticacao);

router.get('/', (requisicao, resposta, next) => {
    resposta.sendFile( path.join(__dirname, '../public/static/home.html') );
});

router.get('/cadastrarProduto', (requisicao, resposta, next) => {
    resposta.sendFile( path.join(__dirname, '../public/static/cadastrarProduto.html') );
});

router.get('/editarProduto', (requisicao, resposta, next) => {
    resposta.sendFile( path.join(__dirname, '../public/static/editarProduto.html') );
});

router.get('/excluirProduto', (requisicao, resposta, next) => {
    resposta.sendFile( path.join(__dirname, '../public/static/excluirProduto.html') );
});



module.exports = {
    router
}