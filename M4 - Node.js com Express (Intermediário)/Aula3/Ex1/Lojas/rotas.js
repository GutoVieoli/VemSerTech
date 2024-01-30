const express = require('express')

const router = express.Router();
router.use(express.json());

const lojas = [
    {
        id: 1,
        nome: "Zema"
    },
    {
        id: 2,
        nome: "AliExpress"
    },
    {
        id: 3,
        nome: "Alvorada"
    }
]

router.all('/', (requisicao, resposta, next) => {
    console.log(`Hora da requisição: ${new Date()}`);
    next();
});

router.get('/', (requisicao, resposta, next) => {
    resposta.send(lojas);
});

router.post('/', (requisicao, resposta, next) => {
    lojas.push(requisicao.body)
    resposta.send('OK.');
});


module.exports = {
    router
}
