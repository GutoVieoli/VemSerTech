const express = require('express')
const app = express();
app.use(express.json());
porta = 3000;

const usuarios = [
    {
        id: 1,
        nome: "Juninho"
    },
    {
        id: 2,
        nome: "Carlinhos"
    },
    {
        id: 3,
        nome: "Marquinhos"
    }
]

function getUsuarios(payload){
    usuarioEncontrado = usuarios.find( usuarios => usuarios.id === payload.id);
    
    if(usuarioEncontrado){
        return usuarioEncontrado;
    }
    else return null;
}

function encontrarID(requisicao, resposta, next) {
    const usuario = getUsuarios(requisicao.body)

    if(usuario){
        resposta.status(200).send( usuario ) ;
        next();   
    }
    else resposta.status(204).send();
}

function requisicaoChegou(requisicao, resposta, next){
    console.log(`Uma resquisicao chegou as ${new Date()}`)
    next();
}

function requisicaoSaiu(requisicao, resposta, next){
    resposta.status(200).send()
    console.log(`Uma resquisicao saiu as ${new Date()}`)
    next();
}

function verificaBody(requisicao, resposta, next){
    if(requisicao.body && Object.keys(requisicao.body).length > 0){
        next();
    } else {
        resposta.status(400).send({
            message: 'É necessário preencher o body da requisição!'
        });
    }
}


app.get('/usuarios', requisicaoChegou, verificaBody, encontrarID, requisicaoSaiu )


app.listen(porta, () => {
    console.log('Servidor iniciado na porta', porta);
})