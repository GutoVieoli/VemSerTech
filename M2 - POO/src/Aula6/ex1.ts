import { question } from 'readline-sync'

class Veiculo{
    private modelo: string;
    private placa: string;
    static contador: number = 0;

    constructor(modelo: string, placa: string){
        this.modelo = modelo;
        this.placa = placa;
        Veiculo.contador++;
    }

    getModelo() : string {
        return this.modelo;
    }

    getPlaca() : string {
        return this.placa;
    }
}

abstract class cadastrarVeiculo{
    veiculos: Veiculo[] = [];

    cadastrar() : void {
        const modelo : string = question("Informe o modelo a ser inserida: ");
        const placa : string = question("Informe a placa a ser inserida: ");
        const veiculo = new Veiculo(modelo, placa);
        this.veiculos.push(veiculo);
        console.log("\nVeiculo cadastrado com sucesso");
    }

    exibirVeiculos() : void {
        this.veiculos.forEach( v => {
            console.log(v.getModelo + " " + v.getPlaca());
        })
    }


}


// let vari : string = '';
// while(vari != "S"){
//     vari = question(`Escolha uma opcao para executar:
//     C - Cadastrar veiculo
//     S - Sair`);

//     if(vari == "C")
// }
const veiculos: Veiculo[] = [];
veiculos.push( new Veiculo("Polo", "abx08") );
veiculos.push( new Veiculo("Gol", "2930") );
veiculos.push( new Veiculo("Civic", "gtx4090") );


veiculos.forEach( v => {
    console.log(` ${v.getModelo()} de placa ${v.getPlaca()}`);
})

console.log("Contador de veiculos: " + Veiculo.contador);