const express = require('express')
const app = express();
app.use(express.json());

const usuarios = [];

const router = express.Router();

router.get('/usuarios', (requisicao, resposta, next) => {
    resposta.send(usuarios);
});


app.use('/locadoras', router);


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta ${PORT}
    https://localhost:${PORT}`)
})