const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const { uploadPost } = require('../config/multer');
const { authorizeAdmin, authorizeUserOrAdmin } = require('../middlewares/authorization.middleware');
const authenticateToken = require('../middlewares/token.middleware');

/**
 * @swagger
 * /api/posts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Lista todos os posts
 *     description: Retorna uma lista com todos os posts cadastrados (requer autenticação)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de posts retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       401:
 *         description: Token não fornecido ou inválido
 */
router.get('/',authenticateToken, authorizeUserOrAdmin, postController.getAllPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Busca post por ID
 *     description: Retorna os dados de um post específico (requer autenticação)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post não encontrado
 *       401:
 *         description: Token não fornecido ou inválido
 */
router.get('/:id',authenticateToken, authorizeUserOrAdmin, postController.getPostById);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Cria um novo post
 *     description: Cria um novo post com upload opcional de imagem (requer perfil Admin ou Full-Admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - user_id
 *             properties:
 *               title:
 *                 type: string
 *                 example: Título do Post
 *               content:
 *                 type: string
 *                 example: Conteúdo completo do post...
 *               user_id:
 *                 type: integer
 *                 example: 1
 *                 description: ID do usuário que está criando o post
 *               postimage:
 *                 type: string
 *                 format: binary
 *                 description: Imagem do post (opcional)
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: Sem permissão (requer Admin ou Full-Admin)
 */
router.post('/',authenticateToken, authorizeAdmin, uploadPost.single('postimage'), postController.createPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     tags:
 *       - Posts
 *     summary: Atualiza um post
 *     description: Atualiza os dados de um post existente (requer perfil Admin ou Full-Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               user_id:
 *                 type: integer
 *               postimage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *       404:
 *         description: Post não encontrado
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: Sem permissão
 */
router.put('/:id',authenticateToken, authorizeAdmin, uploadPost.single('postimage'), postController.updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: Deleta um post
 *     description: Remove um post do sistema (requer perfil Admin ou Full-Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post a ser deletado
 *     responses:
 *       200:
 *         description: Post deletado com sucesso
 *       404:
 *         description: Post não encontrado
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: Sem permissão
 */
router.delete('/:id',authenticateToken, authorizeAdmin, postController.deletePost);

module.exports = router;
