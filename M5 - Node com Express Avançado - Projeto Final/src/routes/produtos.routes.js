const express = require('express');
const produtos = require('../controllers/produtos.controller');

const router = express.Router();
router.use(express.json());


router.get("/", produtos.getAll);
router.post("/", produtos.create);
router.delete("/", produtos.deleteId);
router.put("/", produtos.edit);


module.exports = {
    router
}