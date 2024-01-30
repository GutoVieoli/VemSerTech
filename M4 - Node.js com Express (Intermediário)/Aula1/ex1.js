const express = require('express')
const app = express();
app.use(express.json());
porta = 3000;
const lojas = [];
let lastId = 0;


app.post('/lojas', function (requisicao, resposta) {
    const loja = requisicao.body;
    lastId++;
    loja.id = lastId;
    lojas.push(loja)
    resposta.status(201).send({
        mensagem: "Loja criada!",
        id: loja.id
    })
})

app.get('/lojas', function (requisicao, resposta) {
    resposta.send(lojas)
})

app.listen(porta, () => {
    console.log('Servidor iniciado na porta', porta);
})