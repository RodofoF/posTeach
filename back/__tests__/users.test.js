const request = require('supertest');
const app = require('../app');

describe('Testes de Endpoints: /api/users', () => {
  
  describe('GET /api/users - Listar todos os usuários', () => {
    
    test('Deve retornar 401 quando não estiver autenticado', async () => {
      const response = await request(app)
        .get('/api/users');
      
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Access denied. No token provided.');
    });

    test('Deve retornar 403 com token inválido', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', 'Bearer token_invalido_123');
      
      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('error');
    });

    // TODO: Adicionar teste com autenticação válida
    // test('Deve retornar 200 e lista de usuários quando autenticado', async () => {
    //   // Aqui faremos login primeiro para obter um token válido
    // });
  });

  describe('GET /api/users/:id - Buscar usuário por ID', () => {
    
    test('Deve retornar 401 quando não estiver autenticado', async () => {
      const response = await request(app)
        .get('/api/users/1');
      
      expect(response.status).toBe(401);
    });

    // TODO: Adicionar teste com autenticação válida
    // test('Deve retornar 200 e dados do usuário quando autenticado', async () => {
    //   // Aqui faremos login primeiro
    // });

    // TODO: Adicionar teste para usuário não encontrado
    // test('Deve retornar 404 quando usuário não existir', async () => {
    //   // Fazer login e buscar ID inexistente
    // });
  });

});
