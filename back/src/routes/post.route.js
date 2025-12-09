const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const { uploadPost } = require('../config/multer');

// GET - Listar todos os posts
router.get('/', postController.getAllPosts);

// GET - Buscar post por ID
router.get('/:id', postController.getPostById);

// POST - Criar novo post (com upload de foto)
router.post('/', uploadPost.single('postimage'), postController.createPost);

// PUT - Atualizar post (com upload de foto)
router.put('/:id', uploadPost.single('postimage'), postController.updatePost);

// DELETE - Deletar post
router.delete('/:id', postController.deletePost);

module.exports = router;
