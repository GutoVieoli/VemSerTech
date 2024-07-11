const jwt = require('jsonwebtoken')
require('dotenv').config();

const secretKey =  process.env.JWT_SECRET;

const gerarToken = (id, nome) => {
    const token = jwt.sign(
        {
            id,
            nome
        },
        secretKey,
        {
            expiresIn: "180s"
        }
    );
    return token;
}

const getID = (token) => {
    const payload = jwt.verify(token, secretKey);
    return payload.id;
}

const autenticacao = (req, response, next) => {
    console.log(req.body)
    if(req.body.token){
        const token = req.body.token;
        const jwtResponse = jwt.verify(token, secretKey, (err, payload) => {
            if(err){
                response.status(401).send({message: "Token Invalido ou expirado! Faça login novamente."});
            } else {
                console.log('payload => ', payload);
                next();
            }
        });
    } 
    else {
        response.status(400).send({message: "Insira o token de autenticacao! Faça login para obte-lo."});
    }

}


module.exports = { gerarToken, autenticacao, getID };