const express = require('express')
const jwt = require('jsonwebtoken')

const app = express();
app.use(express.json());
const secretKey = 'minha_secret_key'


const usuarioBD = {
    id: 1,
    usuario: "ronaldo",
    senha: "relogio123"
}

app.post("/login", (req, res) => {
    const { usuario, senha } = req.body;
    if( usuarioBD.usuario === usuario && usuarioBD.senha === senha){
        //usuario autenticado
        const token = jwt.sign(
        {
            id: usuarioBD.id,
            nome: usuarioBD.usuario        
        }, 
        secretKey,
        {
            expiresIn: "20s"
        });

        res.send({token})
    }
    else {
        res.status(401).send({message: 'Usuario nao logado'})
    }
})

const autenticacao = (request, response, next) => {
    const token = request.headers.authorization;
    console.log("Token: ", token);

    const jwtResponse = jwt.verify(token, secretKey, (err, payload) => {
        if(err){
            response.status(401).send("Token Invalido!");
        } else {
            console.log('payload => ', payload);
            next();
        }
    });
}

app.get('/usuario', autenticacao, (req, res, next) => {
    res.send(usuarioBD);
})


app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});