const express = require('express')
const jwt = require('jsonwebtoken')

const secretKey =  process.env.JWT_SECRET;

const gerarToken = (id, nome) => {
    const token = jwt.sign(
        {
            id,
            nome
        },
        secretKey,
        {
            expiresIn: "300s"
        }
    );
    return token;
}

const getID = (token) => {
    const payload = jwt.verify(token, 'secretKey_airgun2024');
    return payload.id;
}

const autenticacao = (request, response, next) => {
    const token = request.cookies.Authorization;

    const jwtResponse = jwt.verify(token, secretKey, (err, payload) => {
        if(err){
            response.status(401).send({message: "Token Invalido ou expirado! Faça login novamente."});
        } else {
            console.log('payload => ', payload);
            next();
        }
    });
}


module.exports = { gerarToken, autenticacao, getID };