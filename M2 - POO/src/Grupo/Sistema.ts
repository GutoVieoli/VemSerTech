import { Cliente } from "./Cliente";
import { Veiculo } from "./Veiculo";
import { Aluguel } from "./Aluguel";
import { question } from 'readline-sync'
import {readFileSync, writeFileSync} from 'fs'

export abstract class Sistema {

    static lerJson(tipoJson : number): Object[] {
        const tipos = ['./Veiculos.json', './Alugueis.json', './Clientes.json'];
        const filePath = tipos[tipoJson];

        const dados = JSON.parse(readFileSync(filePath, {
            encoding: 'utf-8'
        }));
        
        return Array.isArray(dados) ? dados : [dados];
    }


    static salvarJson(tipoJson : number, dados: Object): void{
        const tipos = ['./Veiculos.json', './Alugueis.json', './Clientes.json'];
        const filePath = tipos[tipoJson];

        const dadosAtuais = Sistema.lerJson(tipoJson);
        dadosAtuais.push(dados);
       
        writeFileSync(filePath, JSON.stringify(dadosAtuais));  
    }

    //============================================================================================================

    static lerVeiculos(dados: Object[]): Veiculo[]{
        return dados.map( (dado: any) => {
            const veiculo = new Veiculo(dado.modelo, dado.tipo, dado.placa, dado.valorDiaria);
            return veiculo;
        })
    }

    static lerClientes(dados: Object[]): Cliente[]{
        return dados.map( (dado: any) => {
            const cliente = new Cliente(dado.nome, dado.cpf, dado.carteira);
            return cliente;
        })
    }

    static lerAlugueis(dados: Object[]): Aluguel[]{
        return dados.map( (dado: any) => {
            const aluguel = new Aluguel(dado.veiculo, dado.cliente);
            aluguel.setDataAluguel(dado.dataAluguel);
            aluguel.setIsAtivo(dado.ativo);
            return aluguel;
        })
    }

    //============================================================================================================


    static cadastrarVeiculo() : void {
        const modelo = question("Qual o modelo do carro?: ").toLowerCase();
        const tipo = question("É carro ou moto?: ").toLowerCase();
        const placa = question("Qual a placa do veículo?: ").toLowerCase();
        const diaria = Number(question("Qual o valor da diaria?: "));
        const veiculo = new Veiculo(modelo, tipo, placa, diaria);
        Sistema.salvarJson(0, veiculo);
        console.log("Veiculo cadastrado com sucesso!");
    }    


    static excluirVeiculo() : void {
        const placa = question("Qual a placa do veículo que deseja excluir? ").toLowerCase();
        const buscarPlacaVeiculo = Sistema.buscaVeiculo( placa );
        if( buscarPlacaVeiculo )
        {
            const alugueis = Sistema.lerAlugueis( Sistema.lerJson(1) );
            const alugado = alugueis.find( (aluguel : Aluguel) => 
                aluguel.getIsAtivo() &&  ( aluguel.getVeiculo()['placa'] == placa )
            )

            if(!alugado){
                const veiculos = Sistema.lerVeiculos( Sistema.lerJson(0) );
                const veiculosRestantes = veiculos.filter( veiculo => {
                    return veiculo.getPlaca() != placa;
                })
                writeFileSync('./Veiculos.json', JSON.stringify(veiculosRestantes));
                console.log("Da pra exluir");
            }
            else {
                console.log("O veiculo esta alugado no momento. Nao é possivel excluir.")
            }
        }
        else {
            console.log("Veiculo não encontrado");
        }
    } 

    //============================================================================================================

    static alugarVeiculo(){
        const nome = question("Qual o seu nome?: ")
        const cpf = question("Qual seu CPF?: ").toLowerCase();
        const carteira = question("Qual sua carteira: ").toUpperCase();

        const buscarCpfCliente = Sistema.buscaCliente( cpf );
        let cliente;

        if( buscarCpfCliente ){
            cliente = buscarCpfCliente;
        } else {
            cliente = new Cliente(nome, cpf, carteira);
            Sistema.salvarJson(2, cliente);
        }

        const placa = question("Qual a placa do veiculo que deseja alugar?: ").toLowerCase();
        const buscarPlacaVeiculo = Sistema.buscaVeiculo( placa );
        if( buscarPlacaVeiculo )
        {
            const veiculo = buscarPlacaVeiculo;
            if(carteira === veiculo.getCarteiraNecessaria()){
                const aluguel = new Aluguel(veiculo, cliente)
                Sistema.salvarJson(1, aluguel);
                console.log(`Aluguel realizado. ${veiculo.getModelo()}, R$ ${veiculo.getValorDiaria()} a diária.`)  // -----------
            } else {
                console.log("Sua carteira e o tipo do carro não condizem. Tente alugar outro.")
            }
        } else {
            console.log("Veiculo não encontrado")
        }
    
    }

    static devolverVeiculo(): void{
        const cpf = question("Informe o seu cpf para devolver o veiculo: ").toLowerCase();

        const cliente = Sistema.buscaCliente( cpf );
        const alugueis = Sistema.lerAlugueis( Sistema.lerJson(1) );

        
        const alugado = alugueis.find( (aluguel : Aluguel) => 
            aluguel.getIsAtivo() && (JSON.stringify(aluguel.getCliente()) == JSON.stringify(cliente))
        )
        if(alugado){
            
            console.log(`\nO veiculo '${alugado.getVeiculo()['modelo']}' foi devolvido.\nTotal a pagar: R$${Sistema.calcValorAluguel(alugado)}`);
            alugueis.forEach( (aluguel, i) => {
                if(aluguel === alugado)
                {
                    alugueis[i]['ativo'] = false;
                    writeFileSync('./Alugueis.json', JSON.stringify(alugueis));
                }
            })
        }
        else {
            console.log("\nEste cpf nao possui nenhum veiculo alugado no momento");
        }
        
    }

    static calcValorAluguel(aluguel: Aluguel) : number {
        const now: Date = new Date(); 
        const startDate: Date = new Date(aluguel.getDataAluguel());
        const diferencaEmDias: number = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
        const diasPassados: number = Math.floor(diferencaEmDias);

        if(aluguel.getVeiculo()['tipo'] === 'carro')
            return (aluguel.getVeiculo()['valorDiaria'] * diasPassados) * 1.1;
        else if(aluguel.getVeiculo()['tipo'] === 'moto')
            return (aluguel.getVeiculo()['valorDiaria'] * diasPassados) * 1.05;
        else 
            return -1;
    }

    //============================================================================================================

    static buscaVeiculosDisponiveis() : void {
        const veiculos = Sistema.lerVeiculos( Sistema.lerJson(0) );
        const alugueis = Sistema.lerAlugueis( Sistema.lerJson(1) );

        console.log(`\n------ Veiculos disponiveis no momento ------`)
        veiculos.forEach( (veiculo : Veiculo) => {
            const alugado = alugueis.find( (aluguel : Aluguel) => 
                aluguel.getIsAtivo() && (JSON.stringify(aluguel.getVeiculo()) == JSON.stringify(veiculo))
            )
            if(!alugado)
                console.log(`${veiculo.getTipo().toUpperCase()} -  ${veiculo.getModelo().toUpperCase()}, Placa: ${veiculo.getPlaca().toUpperCase()}, Diaria: R$ ${veiculo.getValorDiaria()}`);
        })
        console.log(`-------------------------------------------`)
    }

    static buscaVeiculosAlugados() : void {
        const veiculos = Sistema.lerVeiculos( Sistema.lerJson(0) );
        const alugueis = Sistema.lerAlugueis( Sistema.lerJson(1) );

        console.log(`\n------- Veiculos alugados no momento -------`)
        veiculos.forEach( (veiculo : Veiculo) => {
            const alugado = alugueis.find( (aluguel : Aluguel) => 
                aluguel.getIsAtivo() && (JSON.stringify(aluguel.getVeiculo()) == JSON.stringify(veiculo))
            )
            if(alugado)
                console.log(`${veiculo.getTipo().toUpperCase()} -  ${veiculo.getModelo().toUpperCase()}, Placa: ${veiculo.getPlaca().toUpperCase()}, Diaria: R$ ${veiculo.getValorDiaria()}`);
        })
        console.log(`--------------------------------------------`)
    }

    static buscaCliente( cpf: string ): Cliente | undefined {
        const clientes = Sistema.lerClientes( Sistema.lerJson(2) );
        const clienteEncontrado = clientes.find( (cliente: Cliente) => cliente.getCpf() === cpf);
        return clienteEncontrado;
    }

    static buscaVeiculo(placa: string): Veiculo | undefined {
        const clientes = Sistema.lerVeiculos( Sistema.lerJson(0) );
        const clienteEncontrado = clientes.find( (veiculo: Veiculo) => veiculo.getPlaca() === placa);
        return clienteEncontrado;
    }

}