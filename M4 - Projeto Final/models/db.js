const sequelize = require('sequelize');

const conexao = new sequelize("airgun", "root", "@Mminecraftl19", {
    host: 'localhost',
    dialect: 'mysql'
})

conexao.authenticate().then(function(){
    console.log("Conexão com o banco de dados realizada com sucesso!")
}).catch(function(){
    console.log("Erro: Conexão com o banco de dados não realizada com sucesso!")
})


module.exports = conexao;