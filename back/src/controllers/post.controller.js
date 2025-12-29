const Post = require('../models/post.model');
const User = require('../models/users.model');
const fs = require('fs');

// GET - Listar todos os posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'username']
            }]
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET - Buscar post por ID
const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id, {
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'username']
            }]
        });
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST - Criar novo post
const createPost = async (req, res) => {
    try {
        const postData = req.body;
        if(req.file) {
            postData.postimage = req.file.path;
        } else {
            // Em breve, adicionar imagem padrão para posts
            postData.postimage = 'public/uploads_data/post/userdefault.png';
        }
        const newPost = await Post.create(postData);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT - Atualizar post
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const postData = req.body;
        if(req.file) {
            postData.postimage = req.file.path;
        } else {
            // Em breve, lógica para manter a imagem atual ou definir padrão
            postData.postimage = 'public/uploads_data/post/userdefault.png';
        }   
        const [updated] = await Post.update(postData, { where: { id } });
        if (updated) {
            const updatedPost = await Post.findByPk(id, {
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['id', 'username']
                }]
            });
            res.status(200).json(updatedPost);
        } else {
            res.status(404).json({ message: 'Post não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE - Deletar post
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Post.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Post não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};
