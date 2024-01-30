# POO

## Atividade Individual

Em um sistema de empréstimo, todo dia recebemos um arquivo chamado **solicitacoes.json** com todas as solicitações de empréstimos do dia anterior, sabendo disso, precisamos criar um script que deve ler esse arquivo, filtrar os empréstimos que serão aprovados e então salvar eles em um novo arquivo chamado **emprestimos-aprovados.json**.
Um empréstimo será aprovado quando:

- O solicitante for maior de 18 anos.
- O valor total do empréstimo for maior que o valor requerido.
- O valor total do empréstimo for igual ao numero de parcelas \* valor por parcela.

## Observações

Utilize funções estáticas e classes abstratas.
