const express = require('express')
const app = express();
app.use(express.json());

app.use( (request, response, next) => {
    console.log(`[${new Date().toLocaleString()}] ${request.method} ${request.url}`)
    next();
})

app.use( (request, response, next) => {
    if(typeof request.body == "object" && Object.keys(request.body).length){
        return next();
    }
    response.status(400).send({
        mensagem: "O corpo da requisição precisa ser um Objeto com dados!"
    })
})

app.get("/healthcheck", (request, response, next) => {
    response.send("Ok");
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(` Aplicação rodando na porta ${PORT} \n https://localhost:${PORT}`)
})