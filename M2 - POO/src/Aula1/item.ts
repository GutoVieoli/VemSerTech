export class Item {
    nome?: string;
    valor?: number;
    quantidade?: number;

    setarNome(nome: string){
        this.nome = nome;
    }
}