const express = require('express')

const app = express();
app.use( express.json() );

const usuarios = [{
    id: 1,
    usuario: "naruto",
    senha: "konoha",
    permissao: "cliente",
},
{
    id: 2,
    usuario: "joao",
    senha: "abcd123",
    permissao: "administrador",
},
];

const lojas = [
    {
        id: 1,
        nome: "bar",
        faturamento: 3000,
        taxa: 100,
    },
    {
        id: 2,
        nome: "hamburgueria",
        faturamento: 4800,
        taxa: 140,
    },
    {
        id: 3,
        nome: "pizzaria",
        faturamento: 12000,
        taxa: 300,
    },
]



const autenticacao = (request, response, next) => {
    const headers = request.headers;
    const usuarioLogin = headers.usuario;
    const usuarioSenha = headers.senha;

    const usuarioEncontrado = usuarios.find( (usuario) => 
        usuario.usuario === usuarioLogin && usuario.senha === usuarioSenha
    )

    if(usuarioEncontrado){
        request.headers.usuario = usuarioEncontrado;
        next();
    } else {
        response.status(401).send({ message: "Usuario ou senha incorretos."})
    }
};

const autorizacao = (permissoes) => {
    return (request, response, next) => {
        const usuario = request.headers.usuario
     
        if(permissoes.includes(usuario.permissao)) {
            next();
        } else {
            response.status(403).send({ message: "Usuario nao tem permissao para acessar esse recurso"})
        }
    }
}



app.get('/lojas', autenticacao,  (request, response) => {
    response.send(lojas.map( (loja) => {
        return {nome: loja.nome,
                id: loja.id} 
    }))
})

app.get('/financeiro', autenticacao, autorizacao("administrador"), (request, response) => {
    response.send(lojas)
})




app.listen(3000, console.log("Servidor iniciado na porta 3000!"));