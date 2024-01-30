const express = require('express')
const app = express();

app.get('/healthcheck', (req, res, next) => {
    try{
        if(req.query.servico === "pagamento"){
            res.send();
        } else {
            throw new Error("Servico Indisponivel");
        }
    } catch(err){
        next(err);
    }
})

app.use( (error, req, res, next) => {
    console.log("caiu no erro!");
    res.status(500).send({
        message: "Servidor indisponivel"
    });
})

app.listen(3000, console.log("Servidor iniciado na porta 3000!"));