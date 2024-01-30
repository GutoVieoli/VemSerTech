const express = require('express')

const app = express();
app.use(express.json());

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


function validacaoSeguranca(requisicao, resposta, next) {
    if(requisicao.body.clientId == 'funcionarioConcessionaria' && requisicao.body.clientSecret == "abcd123"){
        next();
    }
    else resposta.status(401).send();
}


app.get('/veiculos', validacaoSeguranca, (requisicao, resposta, next) => {
    resposta.send(veiculos);
});

app.post('/veiculos', (requisicao, resposta, next) => {
    let id = 0;
    veiculos.forEach( veiculo => {
        id = veiculo.id > id ? veiculo.id+1 : id;
    })
    
    veiculos.push({
        ...requisicao.body, 
        id
    })
    resposta.status(201).send('Veiculo adcionado com sucesso.');
});



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta ${PORT}
    https://localhost:${PORT}`)
})
