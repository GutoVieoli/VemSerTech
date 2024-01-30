import {readFileSync, writeFileSync} from 'fs'

abstract class BD{

    static lerJson(): [] | Object {
        const filePath = './src/Aula6/dados.json';
        const dados = JSON.parse(readFileSync(filePath, {
            encoding: 'utf-8'
        }));
        
        return dados;
    }

    static salvarJson(dados: any){
        const filePath = './src/Aula6/dados.json';
        const dadosAtuais = BD.lerJson();
        writeFileSync(filePath, JSON.stringify(dados));    //espera uma string ou um array e transforma em json
    }

}

const dadosPessoas = BD.lerJson() as [];
dadosPessoas.forEach( pessoa => {
    console.log(pessoa);
})

const pessoas = [{
    nome: "Ana",
    idade: 20,
}, {
    nome: "Paulo",
    idade: 20,   
}, {
    nome: "Andre",
    idade: 24,  
} ]

BD.salvarJson(pessoas);