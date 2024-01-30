const crypto = require('crypto');

dado = 'MinhaSenha@!'
const hash = crypto.createHash('sha256').update( dado ).digest('hex');

console.log("Dado: " , dado);
console.log("Hash: " , hash);