import { question } from 'readline-sync'

class Pessoa {
    protected nome: string;
    protected cpf: string;

    constructor(nome: string, cpf: string){
        this.nome = nome;
        this.cpf = cpf;
    }


    public getNome() : string {
        return this.nome;
    }

    public getCpf() : string {
        return this.cpf;
    }
    
    public setNome(nome : string) {
        this.nome = nome;
    }

    public setCpf(cpf : string) {
        this.cpf = cpf;
    }
      
    
}

class Cliente extends Pessoa {
    constructor(nome: string, cpf: string){
        super(nome, cpf);
    }

    pedir(loja : LojaIfood){
        loja.exibirCatalogo();
        const pedido = new Pedido(this.nome, this.cpf);

        const item : string = question("Qual item deseja adcionar ao pedido? ");
        const price : number = loja.procurarItem(item);
        if( price == -1){
            console.log("Produto não encontrado");        
        } else {
            const qtd : number = parseInt(question("Qual a quantidade? "));
            const desc : string = (item + " | Quantidade: " + qtd + " | Total: R$ " + (price*qtd));  
            pedido.adcionar( desc , (price * qtd));     
        }
        pedido.exibir();

    }
}

class DonoLoja extends Pessoa {
    loja: LojaIfood;

    constructor(nome: string, cpf: string, loja: LojaIfood){
        super(nome, cpf);
        this.loja = loja;
    }

    cadastrarItem(): void{
        const nome: string = question("Digite o nome do item que deseja cadastrar: ");
        const desc: string = question("Digite a descricao do item: ");
        const preco: number = parseFloat(question("Digite o preco do item: "));
        const qtd: number = parseFloat(question("Digite a quantidade do item em estoque: "));

        const item = new ItemLoja(nome, desc, preco, qtd);
        this.loja.addItem(item);
    }
}

class Entregador extends Pessoa {
    constructor(nome: string, cpf: string){
        super(nome, cpf);
    }
}

class LojaIfood{
    private nome: string;
    private endereco: string;
    private catalogo: ItemLoja[] = [];

    constructor(nome: string, endereco: string){
        this.nome = nome;
        this.endereco = endereco;
    }

    public setNome(nome : string) {
        this.nome = nome;
    }
    public setEndereco(endereco : string) {
        this.endereco = endereco;
    }
    public addItem(item : ItemLoja){
        this.catalogo.push(item);
    }

    public getNome() : string {
        return this.nome;
    }
    public getEndereco() : string {
        return this.endereco;
    }

    public exibirCatalogo() : void {
        console.log("\nProdutos da loja " + this.nome + ".");
        
        this.catalogo.forEach( produto => {
            console.log(produto.getNome() + " -> " + produto.getDescricao() + " ->  R$ " + produto.getPreco());  
        })
    }

    public procurarItem(nome : string) : number {
        for(let i : number = 0; i < this.catalogo.length; i++){
            if(this.catalogo[i].getNome().toUpperCase() == nome.toUpperCase()){
                return this.catalogo[i].getPreco();
            }
        }
        return -1;
    }
}

class ItemLoja{
    private nome: string;
    private descricao: string;
    private preco: number;
    private quantidade: number;


	constructor(nome: string, descricao: string, preco: number, quantidade: number){
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidade = quantidade;
    }

    
    public setNome(nome : string) {
        this.nome = nome;
    }
    public setDescricao(descricao : string) {
        this.descricao = descricao;
    }
    public setPreco(preco : number) {
        this.preco = preco;
    }
    public setQuantidade(qtd : number) {
        this.quantidade = qtd;
    }
    
    public getNome() : string {
        return this.nome;
    }
    public getDescricao() : string {
        return this.descricao;
    }
    public getPreco() : number {
        return this.preco;
    }
    public getQuantidade() : number {
        return this.quantidade;
    }
    
}

class Pedido{
    private itens: string[] = [];
    private valorTotal: number = 0;
    private nome: string;
    private cpf: string;

    constructor(nome: string, cpf: string){
        this.nome = nome;
        this.cpf = cpf;
    }

    adcionar(item : string, valor : number) : void{
        this.itens.push(item);
        this.valorTotal += valor;
    }

    exibir() : void {
        console.log("---------------------------------------------");
        this.itens.forEach( item => {
            console.log(item);
        })
        console.log("Valor Total do pedido: " + this.valorTotal);
        console.log("---------------------------------------------");
    }
}

const lojinha = new LojaIfood("Forno a Lenha", "Rua da Consolacao");
const joel = new DonoLoja("Joel", "111", lojinha);
const guto = new Cliente("Joel", "111");

joel.cadastrarItem();
joel.cadastrarItem();
guto.pedir(lojinha);
//console.log(Pessoa1.getNome());
