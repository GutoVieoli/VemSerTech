import { question } from 'readline-sync'

interface Empregado {
    nome: string;
    getCpf(): string;
    getCargo(): string;
    getSalario(): number;
    getEstaAtivo(): boolean;
    setCpf(cpf: string): void;
    setCargo(cargo: string): void;
    setSalario(salario: number): void;
    setEstaAtivo(estaAtivo: boolean): void;
}


class Funcionario implements Empregado {
    nome: string;
    private cpf: string;
    private cargo: string;
    private salario: number;
    private estaAtivo: boolean = true;

    constructor(nome: string, cpf: string, cargo: string, salario: number){
        this.nome = nome;
        this.cpf = cpf;
        this.cargo = cargo.toUpperCase();
        this.salario = salario;
    }

    getCpf(): string {
        return this.cpf;
    }

    getCargo(): string {
        return this.cargo;
    }

    getSalario(): number{
        return this.estaAtivo ? this.salario * 1.1 : this.salario;
    }

    getEstaAtivo(): boolean {
        return this.estaAtivo;
    }

    setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    setCargo(cargo: string): void {
        this.cargo = cargo;
    }

    setSalario(salario: number): void {
        this.salario = salario;
    }

    setEstaAtivo(estaAtivo: boolean): void {
        this.estaAtivo = estaAtivo;
    }

    exibirFuncionario(): void {
        console.log(`Funcionario ${this.nome}, cargo de ${this.cargo}, R$ ${this.getSalario()}`);
    }

}



class Banco{
    nome: string;
    private listaDeFuncionarios: Funcionario[] = [];

    constructor(nome: string){
        this.nome = nome;
    }

    cadastrarFuncionario(Funcionario: Funcionario): void{
        this.listaDeFuncionarios.push(Funcionario);
        console.log("Funcionario adcionado com sucesso.");
    }

    demitirFuncionario(cpf: string): void{
        this.listaDeFuncionarios.forEach( f => {
            if(f.getEstaAtivo() && f.getCpf() == cpf){
                f.setEstaAtivo(false);
                console.log("Funcionario demitido com sucesso.");
            }
        })
    }

    exibirFuncionariosAtivos(): void{
        this.listaDeFuncionarios.forEach( f => {
            if(f.getEstaAtivo()){
                f.exibirFuncionario();
            }
        })
    }

    exibirFuncionariosDemitidos(): void{
        this.listaDeFuncionarios.forEach( f => {
            if(!f.getEstaAtivo()){
                f.exibirFuncionario();
            }
        })
    }

    alterarSalario(cpf: string, novoSalario: number): void{
        this.listaDeFuncionarios.forEach( f => {
            if(f.getEstaAtivo() && f.getCpf() == cpf){
                f.setSalario(novoSalario);
                console.log("Salario alterado com sucesso.");
            }
        })
    }


}

const cleito = new Funcionario("Kreiton", "123.444", "Administrador", 4500)
const jao = new Funcionario("Jaozin", "222.444", "Seguranca", 2700)
const santander = new Banco("Santander");
santander.cadastrarFuncionario(cleito);
santander.cadastrarFuncionario(jao);


let escolha: string = '';
while(escolha != '5'){
    escolha = question(`\nO que deseja fazer?
    1 - Exibir funcionarios ativos
    2 - Exibir funcionarios demitidos
    3 - Demitir um funcionario
    4 - Alterar o salario
    5 - Sair
    Sua Escolha: `);
    
    let cpf: string = "";
    switch(escolha){
        
        case "1":
            santander.exibirFuncionariosAtivos();
            break;
        case "2":
            santander.exibirFuncionariosDemitidos();
            break;
        case "3":
            cpf = question("\nDigite o cpf do funcionario que deseja demitir:\n");
            santander.demitirFuncionario(cpf);
            break;
        case "4":
            cpf = question("\nDigite o cpf do funcionario que deseja alterar o salario:\n");
            const newSalario: number = parseFloat(question("Digite o novo salario do funcionario: "));
            santander.alterarSalario(cpf, newSalario);
        case "5":
            break;
        default:
            console.log("Opcao nao encontrada, digite novamente.");
    }
} 
