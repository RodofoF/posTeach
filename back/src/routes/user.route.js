const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { uploadUser } = require('../config/multer');

// GET - Listar todos os usuários
router.get('/', userController.getAllUsers);

// GET - Buscar usuário por ID
router.get('/:id', userController.getUserById);

// POST - Criar novo usuário (com upload de foto)
router.post('/', uploadUser.single('userimage'), userController.createUser);

// PUT - Atualizar usuário (com upload de foto)
router.put('/:id', uploadUser.single('userimage'), userController.updateUser);

// DELETE - Deletar usuário
router.delete('/:id', userController.deleteUser);

module.exports = router;
