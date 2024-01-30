const bcrypt = require("bcrypt");

const senha = 'laranja';
const salt = bcrypt.genSaltSync(10);
const senhaComHash = bcrypt.hashSync(senha, salt);

console.log("Senha -> ", senha);
console.log("Salt -> ", salt);
console.log("Senha com Hash -> ", senhaComHash);