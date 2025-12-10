const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { uploadUser } = require('../config/multer');
const authenticateToken = require('../middlewares/token.middleware');
const { authorizeUserOrAdmin, authorizeFullAdminOrAdmin } = require('../middlewares/authorization.middleware');

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Lista todos os usuários
 *     description: Retorna uma lista com todos os usuários cadastrados (requer autenticação)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: Sem permissão para acessar
 */
router.get('/',authenticateToken,authorizeUserOrAdmin, userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Busca usuário por ID
 *     description: Retorna os dados de um usuário específico (requer autenticação)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *       401:
 *         description: Token não fornecido ou inválido
 */
router.get('/:id',authenticateToken,authorizeUserOrAdmin, userController.getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Cria um novo usuário
 *     description: Cria um novo usuário com upload opcional de imagem (requer perfil Admin ou Full-Admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - profile_id
 *             properties:
 *               username:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 example: joao@exemplo.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: senha123
 *               profile_id:
 *                 type: integer
 *                 enum: [0, 1, 2]
 *                 example: 2
 *                 description: 0=Full-Admin, 1=Admin, 2=User
 *               userdescription:
 *                 type: string
 *                 example: Descrição do usuário
 *               userimage:
 *                 type: string
 *                 format: binary
 *                 description: Imagem do usuário (opcional)
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: Sem permissão (requer Admin ou Full-Admin)
 */
router.post('/',authenticateToken,authorizeFullAdminOrAdmin, uploadUser.single('userimage'), userController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - Usuários
 *     summary: Atualiza um usuário
 *     description: Atualiza os dados de um usuário existente (requer perfil Admin ou Full-Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               profile_id:
 *                 type: integer
 *                 enum: [0, 1, 2]
 *               userdescription:
 *                 type: string
 *               userimage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: Sem permissão
 */
router.put('/:id',authenticateToken,authorizeFullAdminOrAdmin, uploadUser.single('userimage'), userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Usuários
 *     summary: Deleta um usuário
 *     description: Remove um usuário do sistema (requer perfil Admin ou Full-Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser deletado
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: Sem permissão
 */
router.delete('/:id',authenticateToken,authorizeFullAdminOrAdmin, userController.deleteUser);

module.exports = router;
