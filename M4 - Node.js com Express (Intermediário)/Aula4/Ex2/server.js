const express = require("express");
const app = express();

const emailsContato = [ { email: 'ana@gmail.com' }, { email: 'gui@hotmail.com' } ]

app.use(express.static(__dirname))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.post('/emails', (req, res, next) => {
    console.log("request body", req.body);
    emailsContato.push(req.body);
    console.log(emailsContato);
    res.status(202).sendFile(__dirname + '/sucess.html');
})

app.get('/emails', (req, res, next) => {
    res.status(200).send(emailsContato);
})

app.listen(3000, console.log("Servidor iniciado na porta 3000"));