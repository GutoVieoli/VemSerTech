import { Cliente } from "./Cliente";
import { Veiculo } from "./Veiculo";

export class Aluguel {
    private veiculo: Veiculo;
    private cliente: Cliente;
    private dataAluguel: Date = new Date();
    private ativo: boolean = true;

    constructor(veiculo: Veiculo, cliente: Cliente){
        this.veiculo = veiculo;
        this.cliente = cliente;
    }

    getVeiculo() : Veiculo {
        return this.veiculo;
    }

    getCliente() : Cliente {
        return this.cliente;
    }

    getIsAtivo() : boolean {
        return this.ativo;
    }

    getDataAluguel() : Date {
        return this.dataAluguel;
    }

    setVeiculo(veiculo: Veiculo){
        this.veiculo = veiculo;
    }

    setCliente(cliente: Cliente){
        this.cliente = cliente;
    }

    setIsAtivo(isAtivo: boolean){
        this.ativo = isAtivo;
    }

    setDataAluguel(data: Date){
        this.dataAluguel = data;
    }

}