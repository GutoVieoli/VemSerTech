const express = require('express')
const multer = require('multer')

const app = express();
app.use(express.urlencoded({
    extended: true
}))


const upload = multer({
    limits: {
        fileSize: 3 * 1024 * 1024
    }, 
    fileFilter: (request, file, callback) => {
        if(file.mimetype === 'image/jpeg'){
            callback(null, true);
        } else {
            callback("O arquivo recebido deve ser um JPEG.", false);
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

const livros = []
app.post('/livros', upload.single('capaLivro'), (request, response) => {
    livros.push({
        ...request.body,
        capaLivro: request.file.originalname
    })
    console.log(livros);
    response.send();
})


app.listen(3000, console.log("Servidor iniciado na porta 3000!"));