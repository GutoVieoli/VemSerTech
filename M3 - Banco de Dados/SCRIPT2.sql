create database ifood;
use ifood;

create table agencias (
	agencia_id int not null primary key,
    nome varchar(255) not null,
    endereco varchar(255),
    telefone varchar(255)
);

create table cliente(
	cliente_id serial primary key,
    nome varchar(255),
    data_de_nascimento date,
    agencia int references agencia(agencia_id),
    conta int not null
);