const express = require('express')
const app = express();
const multer  = require('multer')
const crypto = require('crypto')
//const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
})
  
const upload = multer({ storage: storage })


const veiculos = []

app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('uploads'));




app.get('/veiculos', (request, response, next) => {
    response.sendFile(__dirname + '/index.html');
})

app.post('/cadastrar-veiculos', upload.single('foto'), (request, response, next) => {

    veiculos.push({
        ...request.body,
        foto: request.file.originalname,
        id: crypto.randomUUID()
    });
    console.log(request.body, request.file, request.files);
    response.send();
})


app.get('/recuperar-veiculos', (request, response, next) => {
    response.send(veiculos);
})

app.get('/recuperar-foto/:id', (request, response, next) => {
    foto = veiculos.find( veiculo => veiculo.id === request.params.id )
    if(foto){
        response.sendFile(__dirname + '/uploads/' + foto.foto)
    }
    else {
        response.send('ID nao encontrado')
    }
})




app.listen(3000, console.log("Servidor iniciado na porta 3000!"));