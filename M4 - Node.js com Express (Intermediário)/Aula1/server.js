const express = require('express')
const app = express();
app.use(express.json());
porta = 3000;
const usuarios = [];
let lastId = 0;

// app.get('/usuarios', function (req, res) {
//   res.send({
//     mensagem: "Hello word"
//   })
// })


app.post('/usuarios', function (requisicao, resposta) {
    const usuario = requisicao.body;
    lastId++;
    usuario.id = lastId;
    usuarios.push(usuario);
    resposta.status(201).send({
        mensagem: "Usuario criado!",
        id: usuario.id
    })
})

app.get('/usuarios', function (requisicao, resposta) {
    resposta.send(usuarios)
})

app.get('/usuarios/:id', function (requisicao, resposta) {
    const idUsuario = requisicao.params.id;
    const usuarioEncontrado = usuarios.find(usuario => {
        usuario.id == idUsuario
    });
    if(!usuarioEncontrado){
        return resposta.status(204).send();
    }
    resposta.send(usuarioEncontrado)
})

app.listen(porta, () => {
    console.log('Servidor iniciado na porta', porta);
})