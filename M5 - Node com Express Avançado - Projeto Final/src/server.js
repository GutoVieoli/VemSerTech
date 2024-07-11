const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use( cors(        ) );
app.use(bodyParser.json());

const rotasProdutos = require('./routes/produtos.routes');
const rotasUsuarios = require('./routes/usuarios.routes');
const { autenticacao } = require('./auth/autenticacao');

app.use('/produtos', autenticacao, rotasProdutos.router);
app.use('/usuarios', rotasUsuarios.router);



const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log('Servidor iniciado na porta ' + PORT);
})