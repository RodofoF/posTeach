const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// const swaggerSpec = require('./src/config/swagger');

// Carrega as variáveis de ambiente do .env
dotenv.config();

const app = express();

// Middlewares essenciais
app.use(cors()); 
app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use('/public', express.static('public'));


//Rotas
// const authRoutes = require('./src/routes/auth.routes');

// Rotas da API
// app.use('/api/auth', authRoutes);



app.get('/', (req, res) => {
  res.json({ message: 'Hello from Posteach-Backend!' });
});
// app.get('/api/swagger.json', (req, res) => {
//   // Build dynamic servers list based on the incoming request
//   const spec = { ...swaggerSpec };
//   spec.servers = [
//     {
//       url: `${req.protocol}://${req.get('host')}`,
//       description: 'Servidor atual',
//     },
//   ];
//   res.setHeader('Content-Type', 'application/json');
//   res.send(spec);
// });

module.exports = app;
