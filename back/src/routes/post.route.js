const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

// GET - Listar todos os posts
router.get('/', postController.getAllPosts);

// GET - Buscar post por ID
router.get('/:id', postController.getPostById);

// POST - Criar novo post
router.post('/', postController.createPost);

// PUT - Atualizar post
router.put('/:id', postController.updatePost);

// DELETE - Deletar post
router.delete('/:id', postController.deletePost);

module.exports = router;
