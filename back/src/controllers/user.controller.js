const User = require('../models/users.model');
const fs = require('fs');

// GET - Listar todos os usuários
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET - Buscar usuário por ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST - Criar novo usuário
const createUser = async (req, res) => {
    try {
        const userData = req.body;
        
        // Se houver foto enviada, adiciona o caminho ao userData
        if (req.file) {
            userData.userimage = req.file.path;
        }
        const newUser = await User.create(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT - Atualizar usuário
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;
        
        // Se houver nova foto, apaga a antiga
        if (req.file) {
            // Busca o usuário para pegar o caminho da foto antiga
            const user = await User.findByPk(id);
            
            // Se existir foto antiga, apaga do servidor
            if (user && user.userimage) {
                fs.unlink(user.userimage, (err) => {
                    if (err) console.error('Erro ao deletar foto antiga:', err);
                });
            }
            
            // Atualiza com o caminho da nova foto
            userData.userimage = req.file.path;
        }
        
        const [updated] = await User.update(userData, { where: { id } });
        if (updated) {
            const updatedUser = await User.findByPk(id);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE - Deletar usuário
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
