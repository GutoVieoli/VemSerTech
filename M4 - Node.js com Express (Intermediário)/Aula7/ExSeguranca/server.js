const express = require('express')
const crypto = require('crypto');

const app = express();
app.use( express.json() );

const usuarios = [
    {
		id: "6049dd51-0387-4450-afdb-7ecae705a7e4",
		user: "toninho",
		senha: "f3e99be04c0a4aedd134cbf2bbb8b4e55214f7fa5106bc44c9a89848f705cd2d"
	}
];




const autenticacao = (request, response, next) => {

    const usuarioLogin = request.headers.usuario;
    const usuarioSenha = request.headers.senha;
    const senhaHash =  crypto.createHash('sha256').update( usuarioSenha ).digest('hex');

    const usuarioEncontrado = usuarios.find( (usuario) => 
        usuario.usuario === usuarioLogin && usuario.senha === senhaHash
    )    

    if(usuarioEncontrado){
        next();
    } else {
        response.status(401).send({ message: "Usuario ou senha incorretos."})
    }

};




app.get('/login', autenticacao, (request, response) => {
    response.send(usuarios);
})


app.post('/cadastro', (req, res, next) => {
    const user = req.headers.user;
    const senha = req.headers.senha;
    const hash = crypto.createHash('sha256').update( senha ).digest('hex');
    
    usuarios.push( {
        id: crypto.randomUUID(),
        user: user,
        senha: hash
    })

    res.status(203).send();
})




app.listen(3000, console.log("Servidor iniciado na porta 3000!"));