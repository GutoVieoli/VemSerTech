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

app.delete('/lojas/:categoria(mercado|restaurante|distribuidora)/:id', function (requisicao, resposta) {

    const lojaIndex = lojas.findIndex(loja => {
        loja.tipo == requisicao.params.categoria && loja.id == requisicao.params.id
    })

    if (lojaIndex == -1) {
        resposta.status(204).send();
    }
 
    resposta.status(200).send({
        mensagem: "Loja deletada!"
    })
})


app.delete('/lojas/:categoria(restaurante|mercado|distribuidora)/:id', (requisicao, resposta) => {
    const params = requisicao.params;
    console.log("params =>", params);
    if(!lojas.some(loja => loja.id == params.id && loja.categoria == params.categoria)){
        return resposta.status(202).send({
            message: "Não foi encontrado um registro para esse id!"
        });
    }
    lojas.splice(lojas.findIndex(loja => loja.id == params.id && loja.categoria == params.categoria), 1);
    resposta.send()
})



app.get('/lojas', function (requisicao, resposta) {
    resposta.send(lojas)
})

app.listen(porta, () => {
    console.log('Servidor iniciado na porta', porta);
})