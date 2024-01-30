const sequelize = require('sequelize');
const db = require('./db');

const produtos = db.define('produtos', {
    id: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: sequelize.TEXT,
    },
    preco: {
        type: sequelize.DECIMAL,
        allowNull: false
    },
    quantidade: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    categoria: {
        type: sequelize.STRING,
        allowNull: false
    },
    nome_foto: {
        type: sequelize.STRING,
        allowNull: false
    },
    id_usuario: {
        type: sequelize.STRING,
        allowNull: false
    },
}, {
    timestamps: false // Desativa o rastreamento automático de datas
});



// Caso a tabela não exista, ela é criada automaticamente
produtos.sync();

module.exports = produtos;