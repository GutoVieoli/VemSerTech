const express = require('express')

const app = express();

app.get('/', (request, response, next) => {
    response.download(__dirname + '/uploads/lander.jpg');
})




app.listen(3000, console.log("Servidor iniciado na porta 3000!"));