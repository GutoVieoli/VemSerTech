export class Cliente {
    private nome: string;
    private cpf: string;
    private carteira: string;

    constructor(nome: string, cpf: string, carteira: string){
        this.nome = nome;
        this.cpf = cpf;
        this.carteira = carteira;
    }

    setNome(nome: string){
        this.nome = nome;
    }

    getNome(){
        return this.nome;
    }

    setCpf(cpf: string){
        this.cpf = cpf;
    }

    getCpf(){
        return this.cpf;
    }

    setCarteira(carteira: string){
        this.carteira = carteira;
    }

    getCarteira(){
        return this.carteira;
    }
}