const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST - Login (gerar token)
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verifica se email e senha foram enviados
        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        // Busca o usuário pelo email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Compara a senha enviada com a senha criptografada no banco
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email, 
                profile_id: user.profile_id 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Retorna o token e informações do usuário (sem a senha)
        res.status(200).json({
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                profile_id: user.profile_id
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { login };
