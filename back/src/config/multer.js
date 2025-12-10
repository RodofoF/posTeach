const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Criar diretórios se não existirem
const userUploadDir = 'public/uploads_data/users/';
const postUploadDir = 'public/uploads_data/posts/';

if (!fs.existsSync(userUploadDir)) {
    fs.mkdirSync(userUploadDir, { recursive: true });
}

if (!fs.existsSync(postUploadDir)) {
    fs.mkdirSync(postUploadDir, { recursive: true });
}

// Configuração para fotos de USUÁRIOS
const storageUser = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, userUploadDir);
    },
    filename: function (req, file, cb) {
        const nomeUnico = Date.now() + path.extname(file.originalname);
        cb(null, nomeUnico);
    }
});

// Configuração para fotos de POSTS
const storagePost = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, postUploadDir);
    },
    filename: function (req, file, cb) {
        const nomeUnico = Date.now() + path.extname(file.originalname);
        cb(null, nomeUnico);
    }
});

// Upload para usuários
const uploadUser = multer({
    storage: storageUser,
    limits: { fileSize: 5000000 }
});

// Upload para posts
const uploadPost = multer({
    storage: storagePost,
    limits: { fileSize: 5000000 }
});

module.exports = { uploadUser, uploadPost };
