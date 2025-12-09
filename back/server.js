const dotenv = require('dotenv');
const app = require('./app');
const { sequelize } = require('./src/config/db');
const { defineAssociations } = require('./src/models/association.model');
// const swaggerUi = require('swagger-ui-express');
// const setupAssociations = require('./src/models/associations.model');
// const seedProfiles = require('./src/config/seeds/profile.seeder');
// const createDefaultAdminUser = require('./src/config/seeds/createAdmin.js');


dotenv.config();
const port = process.env.PORT || 3000;

// Configuração do Swagger UI
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(null, { swaggerUrl: '/api/swagger.json' }));

async function startServer() {
  try {
    defineAssociations();
    // 1. Configurar associações dos modelos
    // setupAssociations();
    // console.log('Associações de modelos configuradas.');

    // 2. Sincronizar o banco de dados
    await sequelize.sync({ alter: true })
    // await sequelize.sync({ force: true }) // Use 'force: true' apenas em desenvolvimento para recriar tabelas
    console.log('Modelos sincronizados com sucesso.');

    // 3. Rodar os seeders
    // await seedProfiles();
    // console.log('Perfis (Admin, User) garantidos no banco de dados.');
    // await createDefaultAdminUser();

    // 4. Iniciar o servidor
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar o servidor:', error);
    process.exit(1); // Encerra a aplicação em caso de erro crítico na inicialização
  }
}

startServer();