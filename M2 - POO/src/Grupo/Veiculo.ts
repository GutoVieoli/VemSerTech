export class Veiculo {
    private modelo: string;
    private tipo: string;
    private placa: string;
    private valorDiaria: number;
  
    constructor(modelo: string, tipo: string, placa: string, valorDiaria: number) {
      this.modelo = modelo;
      this.tipo = tipo;
      this.placa = placa;
      this.valorDiaria = valorDiaria;
    }
  
    getModelo(): string {
      return this.modelo;
    }
  
    setModelo(novoModelo: string): void {
      this.modelo = novoModelo;
    }
  
    getTipo(): string {
      return this.tipo;
    }
  
    setTipo(tipo: string){
        this.tipo = tipo;
    }
  
    getPlaca(): string {
      return this.placa;
    }

    setPlaca(placa: string){
        this.placa = placa;
    }

    getValorDiaria() : number {
        return this.valorDiaria;
    }

    setValorDiaria(valorDiaria: number) : void {
        this.valorDiaria = valorDiaria;
    }

    getCarteiraNecessaria() : string | null {
        if(this.tipo === 'carro')
            return 'B';
        else if (this.tipo === 'moto')
            return 'A';
        else return null;
    }

  }