const User = require('../../models/users.model');

async function createDefaultAdmin() {
    try {
        // Verifica se já existe um admin
        const existingAdmin = await User.findOne({ where: { email: 'admin@admin.com' } });
        
        if (existingAdmin) {
            console.log('✓ Usuário admin já existe no banco de dados');
            return;
        }

        // Cria o usuário admin padrão
        await User.create({
            username: 'admin',
            email: 'admin@admin.com',
            password: 'admin', // Será criptografado automaticamente pelo beforeCreate
            profile_id: 1, // Admin
            userdescription: 'Administrador do sistema',
            userimage: 'public/uploads_data/user/userdefault.png'
        });

        console.log('✅ Usuário admin criado com sucesso!');
        console.log('   Email: admin@admin.com');
        console.log('   Senha: admin');
        console.log('   Profile: Full-Admin (0)');

    } catch (error) {
        console.error('❌ Erro ao criar usuário admin:', error.message);
        throw error;
    }
}

module.exports = createDefaultAdmin;
