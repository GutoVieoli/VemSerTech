**# Projeto Final: API de Marketplace da Airgun**

Este é o projeto final para uma API de Marketplace da Airgun. Para garantir o funcionamento adequado do código, siga as instruções abaixo:

## Pré-requisitos

1. Certifique-se de ter o MySQL instalado em seu ambiente.
2. Crie uma base de dados chamada "airgun" no MySQL.
3. Execute o script SQL fornecido em `models/database.sql` para criar as tabelas necessárias.
- Os tokens de login são gerados e utilizam cookies.
- Acesse as rotas preferencialmente pelo navegador em vez de ferramentas como Insomnia ou Postman.

## Configuração do Banco de Dados

1. Abra o arquivo `models/db.js`.
2. Altere a constante `conexao` para as variáveis do seu banco de dados (nome da tabela, usuário e senha).

## Inicialização

1. Entre na pasta src
2. Execute o comando `node server.js`
3. A página inicial é `localhost:3000/airgun/login`.

## Login

1. Já há um usuário pré-cadastrado. Email: julia@gmail.com - Senha: feijao7
2. Não há produtos cadastrados

## Acesso às Rotas

- Todas as rotas e tarefas são acessíveis via navegador, exceto o download de imagens.
- Para baixar uma imagem, acesse `http://localhost:3000/airgun/acesso-livre/downloads/nome-da-foto` no navegador.
- Certifique-se de que o nome da foto está correto e corresponde a um arquivo na pasta `public/static/uploads`.

## Redirecionamento e Conexão

- Ao inserir incorretamente o nome de uma rota, você pode ser redirecionado à página de login.
- A conexão tem uma duração de 5 minutos.

Certifique-se de seguir essas instruções para garantir o correto funcionamento do projeto. Para dúvidas ou problemas, entre em contato.