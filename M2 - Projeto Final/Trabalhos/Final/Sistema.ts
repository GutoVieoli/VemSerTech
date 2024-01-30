import { question } from "readline-sync";
import { Veiculo } from "./classes/Veiculo";
import { JSONManager } from "./JSONManager";
import { Cliente } from "./classes/Cliente";
import { Aluguel } from "./classes/Aluguel";

export abstract class Sistema {
    private static paths = {
        clientes: './jsons/Clientes.json', 
        veiculos: './jsons/Veiculos.json', 
        algueis: './jsons/Alugueis.json'
    }

    private static getVeiculos(): Veiculo[] {
        const dadosVeiculo: Veiculo[] = JSONManager.read(this.paths.veiculos)
        return dadosVeiculo.map((dados: any) => {
            return new Veiculo(dados.modelo, dados.tipo, dados.placa, dados.valorDiaria)
        })
    }

    private static getVeiculo(placa: string): Veiculo | undefined {
        const veiculos = this.getVeiculos()
        return veiculos.find( (veiculo: Veiculo) => {
            return veiculo.getPlaca() === placa
        });
    }

    private static getClientes(): Cliente[] {
        const dadosClientes: Cliente[] = JSONManager.read(this.paths.clientes)
        return dadosClientes.map((dado: any) => {
            return new Cliente(dado.nome, dado.cpf, dado.carteira)
        });
    }

    private static getCliente(cpf: string): Cliente | undefined {
        const clientes = this.getClientes()
        return clientes.find((cliente: Cliente) => {
            return cliente.getCpf() === cpf
        })
    }

    private static getAlugueis(): Aluguel[] {
        const dadosAlugueis: Aluguel[] = JSONManager.read(this.paths.algueis)
        return dadosAlugueis.map((dado: any) => {
            const cliente = new Cliente(dado.cliente.nome, dado.cliente.cpf, dado.cliente.carteira)
            const veiculo = new Veiculo(dado.veiculo.modelo, dado.veiculo.tipo, dado.veiculo.placa, dado.veiculo.valorDiaria)
            
            const aluguel = new Aluguel(veiculo, cliente)
            aluguel.setDataAluguel(dado.dataAluguel)  
            aluguel.setIsAtivo(dado.ativo)
            return aluguel
        });
    }

    //////////////////////////////////////////////////////////////////////////////

    // OK
    static cadastrarVeiculo(): void {
        const modelo = question("Qual o modelo do veículo?: ").toLowerCase();
        const tipo = question("É carro ou moto?: ").toLowerCase();
        const placa = question("Qual a placa do veículo?: ").toLowerCase();
        const diaria = Number(question("Qual o valor da diaria?: "));

        const veiculos = Sistema.getVeiculos()
        const newVeiculo = veiculos.find((veiculo) => {
            return veiculo.getPlaca() === placa
        })

        if(!newVeiculo) {
            const veiculo = new Veiculo(modelo, tipo, placa, diaria)
            JSONManager.add('./jsons/Veiculos.json', veiculo)
            console.log("Veículo cadastrado com sucesso!")
        } else {
            console.log("Veículo já cadastrado!")
        }
    }

    // OK
    static alugarVeiculo() {
        const nome = question("Qual o seu nome?: ")
        const cpf = question("Qual seu CPF?: ").toLowerCase();
        const carteira = question("Qual sua carteira: ").toUpperCase();

        const buscarCpfCliente = Sistema.getCliente( cpf );
        let cliente;

        if( buscarCpfCliente ){
            cliente = buscarCpfCliente;
        } else {
            cliente = new Cliente(nome, cpf, carteira);
            JSONManager.add(this.paths.clientes, cliente);
        }

        const placa = question("Qual a placa do veiculo que deseja alugar?: ").toLowerCase();
        const buscarPlacaVeiculo = Sistema.getVeiculo( placa );
        if( buscarPlacaVeiculo )
        {
            const veiculo = buscarPlacaVeiculo;
            const alugueis = Sistema.getAlugueis()

            const filtered = alugueis.filter((alugueis) => {
                return alugueis.getIsAtivo() && (alugueis.getVeiculo().getPlaca() === placa || alugueis.getCliente().getCpf() == cpf)
            })

            if(carteira === veiculo.getCarteiraNecessaria()){
                if(filtered.length === 0) {
                    const aluguel = new Aluguel(veiculo, cliente)
                    JSONManager.add(this.paths.algueis, aluguel)
                    console.log(`Aluguel realizado. ${veiculo.getModelo()}, R$ ${veiculo.getValorDiaria()} a diária.`)
                } else {
                    console.log("Veículo alugado ou você já possue um alguel em seu cpf")
                }
            } else {
                console.log("Sua carteira e o tipo do carro não condizem. Tente alugar outro.")
            }
        } else {
            console.log("Veiculo não encontrado")
        }
    }

    // OK
    static devolverVeiculo() {
        const cpf = question("Informe o seu cpf para devolver o veiculo: ").toLowerCase();

        const cliente = Sistema.getCliente( cpf );
        const alugueis = Sistema.getAlugueis();
        
        const alugado = alugueis.find( (aluguel : Aluguel) => 
            aluguel.getIsAtivo() && (JSON.stringify(aluguel.getCliente()) == JSON.stringify(cliente))
        )
        if(alugado){
            console.log(`\nO veiculo '${alugado.getVeiculo()['modelo']}' foi devolvido.\nTotal a pagar: R$${Sistema.calcValorAluguel(alugado)}`);
            alugueis.forEach( (aluguel, i) => {
                if(aluguel === alugado)
                {
                    alugueis[i]['ativo'] = false;
                    JSONManager.replace(this.paths.algueis, alugueis)
                }
            })
        }
        else {
            console.log("\nEste cpf nao possui nenhum veiculo alugado no momento");
        }
    }

    // OK
    static buscaVeiculosDisponiveis() {
        const veiculos = Sistema.getVeiculos();
        const alugueis = Sistema.getAlugueis();

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
 
    // OK
    static buscaVeiculosAlugados() {
        const veiculos = Sistema.getVeiculos();
        const alugueis = Sistema.getAlugueis();

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

    // OK
    static excluirVeiculo() {
        const placa = question("Qual a placa do veículo que deseja excluir? ").toLowerCase();
        const buscarPlacaVeiculo = Sistema.getVeiculo( placa );
        if( buscarPlacaVeiculo )
        {
            const alugueis = Sistema.getAlugueis();
            const alugado = alugueis.find( (aluguel : Aluguel) => 
                aluguel.getIsAtivo() &&  ( aluguel.getVeiculo()['placa'] == placa )
            )

            if(!alugado){
                const veiculos = Sistema.getVeiculos();
                const veiculosRestantes = veiculos.filter( veiculo => {
                    return veiculo.getPlaca() != placa;
                })
                JSONManager.replace(this.paths.veiculos, veiculosRestantes)
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

    static calcValorAluguel(aluguel: Aluguel) : number {
        const now: Date = new Date(); 
        const startDate: Date = new Date(aluguel.getDataAluguel());
        const diferencaEmDias: number = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
        const diasPassados: number = Math.floor(diferencaEmDias);

        if(aluguel.getVeiculo()['tipo'] === 'carro')
            return Math.round((aluguel.getVeiculo()['valorDiaria'] * diasPassados) * 1.1)
        else if(aluguel.getVeiculo()['tipo'] === 'moto')
            return Math.round((aluguel.getVeiculo()['valorDiaria'] * diasPassados) * 1.05)
        else 
            return -1;
    }
}