const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// GET - Listar todos os usuários
router.get('/', userController.getAllUsers);

// GET - Buscar usuário por ID
router.get('/:id', userController.getUserById);

// POST - Criar novo usuário
router.post('/', userController.createUser);

// PUT - Atualizar usuário
router.put('/:id', userController.updateUser);

// DELETE - Deletar usuário
router.delete('/:id', userController.deleteUser);

module.exports = router;
