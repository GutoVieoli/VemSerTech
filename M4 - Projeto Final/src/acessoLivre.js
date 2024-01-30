const express = require('express');
const path = require('path');
const fs = require('fs');
const dbProdutos = require('../models/produtos');

const router = express.Router();

router.use(express.json());

router.use(express.urlencoded({
    extended: true
}))


const getTodosProdutos = async () => {
    const produtos = await dbProdutos.findAll();
    
    const produtosSeparados = [];
    produtos.forEach((produto, i) => {
        produtosSeparados.push(produto.dataValues);
    });

    return produtosSeparados;
}


router.get('/downloads/:nomeFoto', (request, response) => {
    const nomeFoto = request.params.nomeFoto;
    response.download( path.join(__dirname, '../public/uploads/', nomeFoto) );

    const filePath = path.join(__dirname, '../public/uploads/', nomeFoto);

    if (fs.existsSync(filePath)) {
        response.download(filePath);
    } else {
        response.status(404).send({ message: 'Arquivo não encontrado' });
    }
})


router.get('/listagem', (request, response) => {
    response.sendFile( path.join(__dirname, '../public/static/listagemProdutos.html') );
})


router.post('/listagem', async (request, response, next) => {
    const filtro = request.body.filtro;

    if(filtro === 'Sem filtro'){
        produtosEncontrados = await getTodosProdutos();
        response.send(JSON.stringify(produtosEncontrados));
    }
    else {
        const conteudo = request.body.conteudo;
        console.log(conteudo);
    }
})

module.exports = {
    router
}