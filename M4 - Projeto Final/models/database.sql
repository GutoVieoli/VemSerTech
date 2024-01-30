-- USE ESSE SCRIPT DENTRO DO MYSQL PARA CRIAR O BANCO DE DADOS DO PROJETO
-- No arquivo 'db.js' altere a linha 3, usando o nome da base de dados, o usuário e a sua senha



-- Criação da base de dados
CREATE DATABASE IF NOT EXISTS airgun CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Seleção da base de dados
USE airgun;

-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    nome VARCHAR(32) NOT NULL,
    email VARCHAR(32) NOT NULL UNIQUE,
    senha VARCHAR(256) NOT NULL,
    salt VARCHAR(64) NOT NULL
);

-- Criação da tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    nome VARCHAR(64) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade INT NOT NULL,
    categoria VARCHAR(32),
    nome_foto VARCHAR(64),
    id_usuario VARCHAR(64) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);


INSERT INTO usuarios (id, nome, email, senha, salt)
VALUES ('26033045-d12e-4cd5-bd91-a60d86943149', 'Julia', 'julia@gmail.com', '$2b$10$0RoPs9jQhFZtdwFVV1lGaelKfv6HtKd5MvLCFMBRZLz18CK/Ta/bO', '$2b$10$0RoPs9jQhFZtdwFVV1lGae');