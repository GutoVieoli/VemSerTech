-- Criação da base de dados
CREATE DATABASE IF NOT EXISTS listaCompras CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Seleção da base de dados
USE listaCompras;

-- Criação da tabela de produtos
CREATE TABLE  IF NOT EXISTS produtos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(128) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10, 2) NOT NULL
);

-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    nome VARCHAR(32) NOT NULL,
    email VARCHAR(32) NOT NULL UNIQUE,
    senha VARCHAR(256) NOT NULL,
    salt VARCHAR(64) NOT NULL
);
