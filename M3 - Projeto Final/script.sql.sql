CREATE TABLE Cliente (
    cpf VARCHAR(14) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    carteira VARCHAR(2) NOT NULL
);

-- Criação da tabela Veiculo
CREATE TABLE Veiculo (
    placa VARCHAR(7) PRIMARY KEY,
    modelo VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    valorDiaria DECIMAL(10, 2) NOT NULL
);

-- Criação da tabela Aluguel
CREATE TABLE Aluguel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    veiculoId INT NOT NULL,
    clienteId INT NOT NULL,
    dataAluguel DATETIME NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    valorPagamento decimal(10, 2),
    data_pagamento date,
    formaPagamento VARCHAR(20)
    FOREIGN KEY (veiculoId) REFERENCES Veiculo(placa),
    FOREIGN KEY (clienteId) REFERENCES Cliente(cpf)
);