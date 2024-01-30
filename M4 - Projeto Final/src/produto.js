const express = require('express');
const multer = require("multer");
const path = require('path');
const crypto = require('crypto');
const { getID } = require('./autenticacao');
const dbProd = require('../models/produtos');
const dbUsuarios = require('../models/user')

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({
    extended: true
}))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'))
    },
    filename: (req, file, cb) => {
        const timestamp = new Date().getTime();
        const nomeArquivo = `${timestamp}_`+ file.originalname;
        cb(null, nomeArquivo)
    },
});

const upload = multer({ storage: storage });

router.post('/cadastrarProduto', upload.single('foto'), async (request, response) => {
    const body = request.body;
    const token = request.cookies.Authorization;
    let nomeUsuario;

    try {
        nomeUsuario = getID(token); // Assumindo que o nome do usuário está no payload

    } catch (error) {
        console.error('Erro ao extrair ID do token:', error.message);
        response.status(401).send({ message: "Token Inválido ou Expirado! Faça login novamente." });
        return;
    }

    if (body.nome && body.descricao && body.preco && body.quantidade && body.categoria && request.file && request.file.originalname) {
        const idProduto = crypto.randomUUID();
        // Consultar o banco de dados para obter o ID do usuário
        const usuario = await dbUsuarios.findOne({ where: { nome: nomeUsuario } });

        if (!usuario) {
            response.status(404).send({ message: 'Usuário não encontrado!' });
            return;
        }

        const timestamp = new Date().getTime();
        const nomeArquivo = `${timestamp}_`+ request.file.originalname;

        dbProd.create({
            id: idProduto,
            nome: body.nome,
            descricao: body.descricao,
            preco: body.preco,
            quantidade: body.quantidade,
            categoria: body.categoria,
            nome_foto: nomeArquivo,
            id_usuario: usuario.id // Use usuario.id em vez de usuario
        }).then(() => {
            response.status(201).send({
                message: 'Produto criado com sucesso!',
                id: idProduto
            });
        }).catch((error) => {
            console.error('Erro ao criar produto:', error);
            response.status(500).send({ message: 'Ocorreu algum erro inesperado!' });
        });
    } else {
        response.status(400).send({
            mensagem: "O corpo da requisição não corresponde ao esperado!"
        });
    }
});

router.post('/excluirProduto', async (request, response) => {
    const idProduto = request.body.idProduto;

    try {
        // Verificar se o produto pertence ao usuário autenticado antes de excluir
        const token = request.cookies.Authorization;
        const nomeUsuario = nomeUsuario = getID(token);
        const usuario = await dbUsuarios.findOne({ where: { nome: nomeUsuario } });

        if (!usuario) {
            response.status(404).send({ message: 'Usuário não encontrado!' });
            return;
        }

        const produto = await dbProd.findOne({ where: { id: idProduto, id_usuario: usuario.id } });

        if (!produto) {
            response.status(404).send({ message: 'Produto não encontrado!' });
            return;
        }

        // Excluir o produto
        await dbProd.destroy({ where: { id: idProduto } });
        response.status(200).send({ message: 'Produto excluído com sucesso!' });
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        response.status(500).send({ message: 'Ocorreu algum erro inesperado!' });
    }
});

// Rota para listar produtos
router.post('/listagemProdutos', async (request, response) => {
    try {

        const { filtro, conteudo } = request.body;

        let produtos;

        if (filtro === 'Sem filtro') {
            produtos = await dbProd.findAll();
        } else if (filtro === 'ID do usuário') {
            // Lógica para filtrar por ID do usuário
            produtos = await dbProd.findAll({ where: { id_usuario: conteudo } });
        } else if (filtro === 'Categoria do produto') {
            // Lógica para filtrar por Categoria do Produto
            produtos = await dbProd.findAll({ where: { categoria: conteudo } });
        } else {
            response.status(400).send({ message: 'Opção de filtro inválida!' });
            return;
        }

        response.status(200).json(produtos);
    } catch (error) {
        console.error('Erro ao listar produtos para edição:', error);
        response.status(500).send({ message: 'Ocorreu algum erro inesperado!' });
    }
});

router.post('/editarProduto', upload.single('novaFoto'), async (request, response) => {
    const { idProduto, nome, descricao, preco, quantidade, categoria } = request.body;

    try {
        // Verificar se o produto pertence ao usuário autenticado antes de editar
        const token = request.cookies.Authorization;
        const nomeUsuario  = getID(token);
        const usuario = await dbUsuarios.findOne({ where: { nome: nomeUsuario } });

        if (!usuario) {
            response.status(404).send({ message: 'Usuário não encontrado!' });
            return;
        }

        const produto = await dbProd.findOne({ where: { id: idProduto, id_usuario: usuario.id } });

        if (!produto) {
            response.status(404).send({ message: 'Produto não encontrado!' });
            return;
        }

        // Atualizar o produto
        await dbProd.update({
            nome: nome || produto.nome,
            descricao: descricao || produto.descricao,
            preco: preco || produto.preco,
            quantidade: quantidade || produto.quantidade,
            categoria: categoria || produto.categoria,
            nome_foto: request.file ? request.file.filename : produto.nome_foto
        }, { where: { id: idProduto } });

        response.status(200).send({ message: 'Produto atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao editar produto:', error);
        response.status(500).send({ message: 'Ocorreu algum erro inesperado!' });
    }
});


module.exports = {
    router
}