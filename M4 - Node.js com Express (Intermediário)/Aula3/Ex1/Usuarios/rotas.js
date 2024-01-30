const express = require('express')

const router = express.Router();
router.use(express.json());

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

router.all('/', (requisicao, resposta, next) => {
    console.log(`Hora da requisição: ${new Date()}`);
    next();
});

router.get('/', (requisicao, resposta, next) => {
    resposta.send(usuarios);
});

router.post('/', (requisicao, resposta, next) => {
    usuarios.push(requisicao.body)
    resposta.send('OK.');
});


module.exports = {
    router
}
