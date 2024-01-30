const express = require('express')
const multer = require('multer')

const app = express();
app.use(express.urlencoded({
    extended: true
}))


const upload = multer({
    limits: {
        fileSize: 5 * 1024 * 1024
    }, 
    fileFilter: (request, file, callback) => {
        if(file.mimetype.startsWith('image')){
            callback(null, true);
        } else {
            callback("O arquivo recebido deve ser uma imagem.", false);
        }
    },
    storage: multer.diskStorage({
        // configurando o nome do arquivo
        filename: (request, file, callback) => {
            callback(null, file.originalname);
        },
        // configurando o destino do arquivo
        destination: (request, file, callback) => {
            callback(null, __dirname + '/uploads');
        }
    })
})

const fotos = []

app.get('/', (request, response, next) => {
    response.sendFile(__dirname + '/index.html');
})

app.post('/save-img', upload.single('foto'), (request, response) => {
    fotos.push({
        ...request.body,
        foto: request.file.originalname
    })
    console.log(fotos);
    response.send();
})


app.listen(3000, console.log("Servidor iniciado na porta 3000!"));