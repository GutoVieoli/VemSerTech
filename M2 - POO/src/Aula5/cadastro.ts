import { question } from 'readline-sync'

class Funcionario{
    private nome: string;
    private email: string;
    private cpf: string;
    private idade: number;
    private cargo: string;
    private salario: number;

    constructor( nome: string, email: string, cpf: string, idade: number, cargo: string, salario: number){
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    
    public getNome() : string {
        return this.nome;
    }
    public getEmail() : string {
        return this.email;
    }
    public getCpf() : string {
        return this.cpf;
    }
    public getIdade() : number {
        return this.idade;
    }
    public getCargo() : string {
        return this.cargo;
    }
    public getSalario() : number {
        return this.salario;
    }

    
    public setNome(nome : string) {
        this.nome = nome;
    }
    public setEmail(email : string) {
        this.email = email;
    }
    public setCpf(cpf : string) {
        this.cpf = cpf;
    }
    public setIdade(idade : number) {
        this.idade = idade;
    }
    public setCargo(cargo : string) {
        this.cargo = cargo;
    }
    public setSalario(salario : number) {
        this.salario = salario;
    }
    
    
}


class Sistema{
    funcionarios: Funcionario[] = []

    cadastrarFuncionario() : void{
        const nome = question("Insira o nome: ");
        const email = question("Insira o email: ");
        const cpf = question("Insira o cpf: ");
        const idade = parseInt(question("Insira a idade: "));
        const cargo = question("Insira o cargo: ");
        const salario = parseFloat(question("Insira o salario: "));

        const newFuncionario = new Funcionario(nome, email, cpf, idade, cargo, salario);
        this.funcionarios.push(newFuncionario);
        console.log("\nFuncionario Cadastrado\n")
    }

    listarFuncionarios() : void{
        this.funcionarios.forEach( (funcionario, i) => {
            console.log("\nFuncionario " + i);
            console.log(`${funcionario.getNome()}, ${funcionario.getIdade()} anos, cpf: ${funcionario.getCpf()}`)
            console.log(`${funcionario.getCargo()}, R$ ${funcionario.getSalario()}, ${funcionario.getEmail()}`)
        })
    }

    alterarDados() : void {
        const cpf : string = question('Digite o CPF do cliente que deseja alterar: ')
        const propriedade : number = parseInt(question(`Qual propriedade voce deseja alterar?
        1 - Nome
        2 - Email
        3 - CPF
        4 - Idade
        5 - Cargo
        6 - Salario`));
    }
}

const syst = new Sistema();
syst.cadastrarFuncionario();
syst.cadastrarFuncionario();
syst.listarFuncionarios();