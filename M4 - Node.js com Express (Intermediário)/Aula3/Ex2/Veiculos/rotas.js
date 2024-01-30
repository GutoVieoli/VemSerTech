const express = require('express')

const router = express.Router();
router.use(express.json());

const veiculos = [
    {
        id: 1,
        nome: "Prisma"
    },
    {
        id: 2,
        nome: "Sandero"
    },
    {
        id: 3,
        nome: "Belina"
    }
]


router.get('/', (requisicao, resposta, next) => {
    resposta.send(veiculos);
});

router.post('/', (requisicao, resposta, next) => {
    veiculos.push(requisicao.body)
    resposta.status(201).send('Veiculo adcionado com sucesso.');
});


module.exports = {
    router
}
