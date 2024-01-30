class Loja {
    itens: Item[] = [];

    adcionarItem( item: Item): void{
        this.itens.push(item);
    }

    mostrarItens(): void {
        this.itens.forEach( e => {
            console.log(e);
        })
    }
}

class Item {
    nome: string;
    descricao: string;
    quantidade: number = 0;
    valor: number;

    constructor(nome: string, descricao: string, valor: number){
        this.nome = nome;
        this.descricao = descricao;
        this.valor = valor;
        this.mostrarItem();
    }

    mostrarItem(): void{
        console.log(`Produto: ${this.nome}; ${this.descricao}; R$ ${this.valor}`);
    }

    realizarPedido(nomeCliente: string, quantidade: number): void {
        if(this.quantidade >= quantidade){
            console.log(`O cliente ${nomeCliente} pediu ${quantidade} ${this.nome}`);
            this.quantidade -= quantidade;
        }
        else {
            console.log(`Quantidade de ${this.nome} insuficiente no estoque`);
        }
    }

    adcionarQuantidade(qtd: number): void{
        this.quantidade += qtd;
    }
}

const hamburguer = new Item("Hamburguer", "Pao, carne e queijo", 38);
hamburguer.adcionarQuantidade(40);
hamburguer.realizarPedido("Augusto", 7);

const loja1 = new Loja();
loja1.adcionarItem(hamburguer);
loja1.mostrarItens();
