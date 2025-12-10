const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const { uploadPost } = require('../config/multer');
const { authorizeAdmin, authorizeUserOrAdmin } = require('../middlewares/authorization.middleware');
const authenticateToken = require('../middlewares/token.middleware');

// GET - Listar todos os posts
router.get('/',authenticateToken, authorizeUserOrAdmin, postController.getAllPosts);

// GET - Buscar post por ID
router.get('/:id',authenticateToken, authorizeUserOrAdmin, postController.getPostById);

// POST - Criar novo post (com upload de foto)
router.post('/',authenticateToken, authorizeAdmin, uploadPost.single('postimage'), postController.createPost);

// PUT - Atualizar post (com upload de foto)
router.put('/:id',authenticateToken, authorizeAdmin, uploadPost.single('postimage'), postController.updatePost);

// DELETE - Deletar post
router.delete('/:id',authenticateToken, authorizeAdmin, postController.deletePost);

module.exports = router;
