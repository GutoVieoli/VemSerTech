import { Item } from './item'
import { ItemCaro } from './itemCaro';

const Hamburguer = new Item();
Hamburguer.setarNome("X-Tudo Duplo");
console.log(Hamburguer);

const Hamburguer2 = new ItemCaro();
Hamburguer2.setarNome("X-Tudo Duplo");
console.log(Hamburguer2);

const pedido = [Hamburguer, Hamburguer2];
pedido.forEach( item => {
    console.log("Novo item ", item);
    console.log("É do tipo normal? " + (item instanceof Item));
    console.log("É do tipo caro? " + (item instanceof ItemCaro));
})
