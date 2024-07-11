const produtos = require('../models/produtos.model')

const create = async (req, res) => {
    const body = req.body;
    
    if(body.nome && body.descricao && body.preco){

        const produto = await produtos.findOne({ where: { nome: body.nome } })
        
        if(produto){
            res.status(403).send({ message: 'Já existe um produto com esse nome!' })
        }

        else {
            produtos.create({
                nome: body.nome,
                descricao: body.descricao,
                preco: body.preco
            }).then(() => {
                res.status(201).send({
                    message: 'Produto criado com sucesso!'
                });
            }).catch((error) => {
                console.error('Erro ao criar produto:', error);
                res.status(500).send({ message: 'Erro ao criar o produto!' });
            });
        }

    } else {
        res.status(400).send({
            mensagem: "O corpo da requisição não corresponde ao esperado!"
        });
    }
}

const getAll = async (req, res) => {
    try{
        const allProdutos = await produtos.findAll();
        res.status(200).json(allProdutos);
    }
    catch (error) {
        console.error('Erro ao recuperar os produtos: ', error);
        res.status(500).send({ message: 'Ocorreu um erro ao recuperar os produtos!' });      
    }
}

const deleteId = async (req, res) => {
    if(req.body.id){
        const theProduto = await produtos.findOne({ where: { id: req.body.id } })
        if(theProduto){
            try {
                await produtos.destroy({ where: { id: req.body.id } });
                res.status(200).send({ message: 'Produto excluído com sucesso!' });                
            }
            catch(error) {
                console.error('Erro ao excluir produto:', error);
                res.status(500).send({ message: 'Ocorreu algum erro inesperado ao tentar excluir!' });                
            }
        }
        else {
            res.status(404).send({ message: 'Produto não encontrado!' });
        }
    } else {
        res.status(400).send({
            mensagem: "O corpo da requisição não corresponde ao esperado!"
        });
    }
}


const edit = async (request, response) => {
    const id = request.body.id;
    const nome = request.body.nome;
    const descricao = request.body.descricao;
    const preco = request.body.preco;

    if(id)
    {
        try {
            const produto = await produtos.findOne({ where: { id } });
    
            if (!produto) {
                response.status(404).send({ message: 'Produto não encontrado!' });
                return;
            }
    
            // Atualizar o produto
            await produtos.update({
                nome: nome || produto.nome,
                descricao: descricao || produto.descricao,
                preco: preco || produto.preco,
            }, { where: { id } });
    
            response.status(200).send({ message: 'Produto atualizado com sucesso!' });
        } catch (error) {
            console.error('Erro ao editar produto:', error);
            response.status(500).send({ message: 'Ocorreu algum erro inesperado!' });
        }
    }
    else {

    }
};


module.exports = { create, getAll, deleteId, edit }