const express = require('express')
const path = require('path');
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const dbUser = require('../models/user');
const { gerarToken, autenticacao } = require('./autenticacao');


const router = express.Router();

router.use(express.json());
router.use(cookieParser());

router.use(express.urlencoded({
    extended: true
}))


const existeEmail = async (email) => {
    const procuraEmail = await dbUser.findAll( {
        attributes: ['email'],
        where: { email: email }
    } )
    return procuraEmail.length != 0;
}

const existeConta = async (email) => {
    const procuraConta = await dbUser.findOne( {
        where: { email: email }
    } )

    return procuraConta;
}



router.get('/login', (requisicao, resposta, next) => {
    resposta.sendFile(path.join(__dirname, '../public/static/login.html'));
});


router.get('/cadastro', (requisicao, resposta, next) => {
    resposta.sendFile(path.join(__dirname, '../public/static/cadastro.html'));
});


router.post('/login', async (requisicao, resposta, next) => {
    const email = requisicao.body.email;
    const senha = requisicao.body.senha;
    
    const procuraConta = await existeConta(email);
    if (procuraConta) {                                                   // Tenta Logar
        const salt = procuraConta.dataValues.salt;
        const senhaBD = procuraConta.dataValues.senha;

        if( bcrypt.hashSync(senha, salt) === senhaBD){                   // Senha aceita
            const nome = procuraConta.dataValues.nome;
            const id = procuraConta.dataValues.id;
            const token = gerarToken(nome, id);

            resposta.cookie('Authorization', token, { httpOnly: true });
            resposta.redirect('/airgun/home');
        } 
        else {                                                           // Senha incorreta
            resposta.status(400).send({message: 'Senha incorreta.'})
        }
    } 
    else {
        resposta.status(400).send({message: "Email não encontrado."})
    }


});

router.post('/cadastro', async (requisicao, resposta, next) => {
    const id = crypto.randomUUID();
    const nome = requisicao.body.nome;
    const email = requisicao.body.email;
    const senha = requisicao.body.senha;
    const salt = bcrypt.genSaltSync();
    const senhaHash = bcrypt.hashSync(senha, salt);
   

    if(nome.length < 4){
        resposta.status(400).send({ message: 'O nome deve ter pelo menos 4 caracteres.'})
    } 
    else if(senha.length < 6 || !/(?=.*[a-zA-Z])(?=.*\d)/.test(senha)){
        resposta.status(400).send({ message: 'A senha deve ter pelo menos 6 caracteres, além de conter letras e números.'})
    }
    else if ( await existeEmail(email) ) {
        resposta.status(400).send({ message: 'Esse email já esta cadastrado.'})
    }
    else {
        await dbUser.create( {
            id, nome, email, senha: senhaHash, salt
        }).then( () => {
            resposta.status(201).send({
                message: 'Usuário criado com sucesso!',
                id
            })
        }).catch( () => {
            resposta.status(500).send({message: 'Ocorreu algum erro inesperado!'})
        });
    }


});


module.exports = {
    router
}