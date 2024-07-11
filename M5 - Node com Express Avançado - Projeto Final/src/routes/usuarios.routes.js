const express = require('express');
const usuarios = require('../controllers/usuarios.controller');

const router = express.Router();
router.use(express.json());


router.post("/", usuarios.create);
router.post("/login", usuarios.login);
router.delete("/", usuarios.deleteUser);


module.exports = {
    router
}