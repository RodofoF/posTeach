const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PosTeach API',
      version: '1.0.0',
      description: 'API para gerenciamento de usuários e posts com autenticação JWT',
      contact: {
        name: 'API Support',
        email: 'admin@admin.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT no formato: Bearer {token}'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['username', 'email', 'password', 'profile_id'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID auto-incrementado do usuário'
            },
            username: {
              type: 'string',
              description: 'Nome do usuário'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email único do usuário'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Senha do usuário (criptografada com bcrypt)'
            },
            profile_id: {
              type: 'integer',
              enum: [0, 1, 2],
              description: '0 = Full-Admin, 1 = Admin, 2 = User'
            },
            userimage: {
              type: 'string',
              description: 'Caminho da imagem do usuário'
            },
            userdescription: {
              type: 'string',
              description: 'Descrição do usuário'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Post: {
          type: 'object',
          required: ['title', 'content', 'user_id'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID auto-incrementado do post'
            },
            title: {
              type: 'string',
              description: 'Título do post'
            },
            subtitle: {
              type: 'string',
              description: 'Subtítulo do post'
            },
            content: {
              type: 'string',
              description: 'Conteúdo do post'
            },
            postimage: {
              type: 'string',
              description: 'Caminho da imagem do post'
            },
            user_id: {
              type: 'integer',
              description: 'ID do usuário que criou o post'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js'] // Caminho para os arquivos com anotações Swagger
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
