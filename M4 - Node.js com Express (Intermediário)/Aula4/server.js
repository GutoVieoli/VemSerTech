const express = require("express");
const app = express();

router = express.Router();

router.get("/", (req, res, next) => {
    console.log("Bateu no primeiro middleware");
    next("router");
}, (req, res, next) => {
    console.log("Bateu no segundo middleware");
});

router.get("/", (req, res, next) => {
    console.log("Bateu no terceiro middleware");
    res.status(200).send("Ok");
});

app.use('/usuarios', router, (req, res, next) => {
    console.log('Fim da requisiçao')
    res.status(403).send();
})

app.listen(3000, () => console.log("Aplicação rodando na porta 3000"))