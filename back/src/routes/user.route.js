const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { uploadUser } = require('../config/multer');
const authenticateToken = require('../middlewares/token.middleware');
const { authorizeUserOrAdmin, authorizeFullAdminOrAdmin } = require('../middlewares/authorization.middleware');

// GET - Listar todos os usuários
router.get('/',authenticateToken,authorizeUserOrAdmin, userController.getAllUsers);

// GET - Buscar usuário por ID
router.get('/:id',authenticateToken,authorizeUserOrAdmin, userController.getUserById);

// POST - Criar novo usuário (com upload de foto)
router.post('/',authenticateToken,authorizeFullAdminOrAdmin, uploadUser.single('userimage'), userController.createUser);

// PUT - Atualizar usuário (com upload de foto)
router.put('/:id',authenticateToken,authorizeFullAdminOrAdmin, uploadUser.single('userimage'), userController.updateUser);

// DELETE - Deletar usuário
router.delete('/:id',authenticateToken,authorizeFullAdminOrAdmin, userController.deleteUser);

module.exports = router;
