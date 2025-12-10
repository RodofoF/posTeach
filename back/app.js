const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');

// Carrega as variáveis de ambiente do .env
dotenv.config();

const app = express();

// Middlewares essenciais
app.use(cors()); 
app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use('/public', express.static('public'));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'PosTeach API Docs'
}));


//Rotas
const authRoutes = require('./src/routes/auth.routes');

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/users', require('./src/routes/user.route'));
app.use('/api/posts', require('./src/routes/post.route'));


app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello from Posteach-Backend!',
    docs: 'http://localhost:3000/api-docs'
  });
});

module.exports = app;
