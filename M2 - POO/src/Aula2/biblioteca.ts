import { question } from 'readline-sync'

interface ILivro {
    nome: string;
    ano: number;
    categoria: string;
}

interface IAutor {
    nome: string;
    dataNascimento: string;
    livros: Livro[]; 
}

// Classe Livro
class Livro implements ILivro{
    nome!: string;
    ano!: number;
    categoria!: string;
}

// Classe Autor
class Autor implements IAutor{
    nome!: string;
    dataNascimento!: string;
    livros: Livro[] = []; 
}


// Criando 2 autores
const autor1 = new Autor();
autor1.nome = question("Qual o nome do autor?\n");
autor1.dataNascimento = "06-12-1974";

const autor2 = new Autor();
autor2.nome = question("Qual o nome do autor?\n");
autor2.dataNascimento = "24-04-1564";

// Criando 4 livros
const livro1 = new Livro();
livro1.nome = question("Qual o nome do livro?\n");
livro1.ano = 1912;
livro1.categoria = "Romance";

const livro2 = new Livro();
livro2.nome = question("Qual o nome do livro?\n");
livro2.ano = 1587;
livro2.categoria = "Romance";

const livro3 = new Livro();
livro3.nome = question("Qual o nome do livro?\n");
livro3.ano = 1993;
livro3.categoria = "Comédia";

const livro4 = new Livro();
livro4.nome = question("Qual o nome do livro?\n");
livro4.ano = 2014;
livro4.categoria = "Ficção Científica";


//Adicionando 2 em Cada Autor
autor1.livros.push(livro3);
autor1.livros.push(livro4);

autor2.livros.push(livro1);
autor2.livros.push(livro2);


//Exibindo os autores
const autores = [autor1, autor2];
autores.forEach( autor => {
    autor.livros.forEach( livro => {
        console.log( livro.nome + ", " + livro.ano + ". Escrito por " + autor.nome + ", " + autor.dataNascimento);
    })
})
