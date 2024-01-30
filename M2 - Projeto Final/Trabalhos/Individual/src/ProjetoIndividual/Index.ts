import {readFileSync, writeFileSync} from 'fs'


abstract class Sistema {

    static lerJson(): Object[] {
        const filePath = './src/ProjetoIndividual/solicitacoes.json';

        const dados = JSON.parse(readFileSync(filePath, {
            encoding: 'utf-8'
        }));
        
        return Array.isArray(dados) ? dados : [dados];
    }

    static preencherAprovados(aprovados: Object[] | Object): void{
        const filePath = './src/ProjetoIndividual/emprestimos-aprovados.json';
        writeFileSync(filePath, JSON.stringify(aprovados)); 
        console.log('Os emprestimos aprovados foram escritos no JSON com sucesso!')
    }

    static filtrarMaioridade(dados: Object[]): Object[] {
        return dados.filter( (solicitacao: any) => {
            return solicitacao.idade > 18;
        });
    }

    static filtrarValorEmprestimo(dados: Object[]): Object[] {
        return dados.filter( (solicitacao: any) => {
            return solicitacao.emprestimo.valorTotal > solicitacao.emprestimo.valorRequerido;
        });
    }

    static filtrarValorParcelas(dados: Object[]): Object[] {
        return dados.filter( (solicitacao: any) => {
            return solicitacao.emprestimo.valorTotal == Math.round(solicitacao.emprestimo.valorParcela * solicitacao.emprestimo.numeroParcelas);
        })
    }

    static filtrarEmprestimosValidos(): void {
        let dados = Sistema.lerJson();
        dados = Sistema.filtrarMaioridade(dados);
        dados = Sistema.filtrarValorEmprestimo(dados);
        dados = Sistema.filtrarValorParcelas(dados);
        Sistema.preencherAprovados(dados)
    }

}



Sistema.filtrarEmprestimosValidos();