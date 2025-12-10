const dotenv = require('dotenv');
const app = require('./app');
const { sequelize } = require('./src/config/db');
const { defineAssociations } = require('./src/models/association.model');
const createDefaultAdmin = require('./src/config/seeders/createAdmin.seed');

dotenv.config();
const port = process.env.PORT || 3000;

async function startServer() {
  try {
    // 1. Configurar associações dos modelos
    defineAssociations();
    console.log('✅ Associações de modelos configuradas.');

    // 2. Sincronizar o banco de dados
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados com sucesso.');

    // 3. Criar usuário admin padrão
    await createDefaultAdmin();

    // 4. Iniciar o servidor
    app.listen(port, () => {
      console.log(`\n Servidor rodando em http://localhost:${port}`);
      console.log(`API disponível em http://localhost:${port}/api`);
    });
  } catch (error) {
    console.error('❌ Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
}

startServer();