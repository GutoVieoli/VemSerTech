const express = require('express')
const app = express();
const multer  = require('multer')


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


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
app.post('/cadastrar-veiculos', upload.array('foto'), (request, response, next) => {

    console.log("Veiculos salvos " + request.files);
    response.send();
})





app.listen(3000, console.log("Servidor iniciado na porta 3000!"));