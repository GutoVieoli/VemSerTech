const express = require('express')

const router = express.Router();
const locadoras = ["localiza", "movida", "outras"]

router.all('/', (requisicao, resposta, next) => {
    console.log(`Hora da requisição: ${new Date()}`);
    next();
});

router.get('/', (requisicao, resposta, next) => {
    resposta.send(locadoras);
});

router.post('/', (requisicao, resposta, next) => {
    locadoras.push(req.body.veiculo)
    resposta.send('OK.');
});


module.exports = {
    router
}
