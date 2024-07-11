const db = require('./db');
const sequelize = require('sequelize');

const produtos = db.define('produtos', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
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
}, {
    timestamps: false // Desativa o rastreamento automático de datas
});



// Caso a tabela não exista, ela é criada automaticamente
produtos.sync();

module.exports = produtos;