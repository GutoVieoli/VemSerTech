const express = require('express')

const router = express.Router();
const veiculos = ["monza", "l200", "fusca"]

router.all('/', (requisicao, resposta, next) => {
    //console.log(`Hora da requisição: ${new Date()}`);
    next();
});

router.get('/', (requisicao, resposta, next) => {
    resposta.send(veiculos);
});

router.post('/', (requisicao, resposta, next) => {
    veiculos.push(req.body.veiculo)
    resposta.send('OK.');
});


module.exports = {
    router
}
