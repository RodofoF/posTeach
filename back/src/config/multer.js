const multer = require('multer');
const path = require('path');

// Configuração para fotos de USUÁRIOS
const storageUser = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads_data/user/');
    },
    filename: function (req, file, cb) {
        const nomeUnico = Date.now() + path.extname(file.originalname);
        cb(null, nomeUnico);
    }
});

// Configuração para fotos de POSTS
const storagePost = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads_data/post/');
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
