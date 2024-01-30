import { question } from 'readline-sync'
import { Sistema } from "./Sistema";

function main() : void {
    console.log('Bem-vindo a nossa locadora de veículos!')
    let opcao: number = 0;
    
    while(opcao != 7){
        opcao = Number(question(`\n--------------------------------
Informe a opcao desejada!
--------------------------------
1. Cadastrar veiculo
2. Alugar veiculo
3. Devolver veiculo
4. Listar veiculos disponiveis
5. Listar veiculos alugados
6. Excluir Veiculo
7. Sair
- Sua escolha: `));
    
        switch(opcao){
            case 1:
                Sistema.cadastrarVeiculo();
                break;
            case 2:
                Sistema.alugarVeiculo();
                break;
            case 3:
                Sistema.devolverVeiculo();
                break;
            case 4:
                Sistema.buscaVeiculosDisponiveis()
                break;
            case 5:
                Sistema.buscaVeiculosAlugados();
                break;
            case 6:
                Sistema.excluirVeiculo();
                break;
            case 7:
                break;
            default:
                break;
        }
    }

    console.log("\nPrograma Finalizado, volte sempre!");
}


main();
