/**
 * Testes de Integração: /api/users
 * 
 * IMPORTANTE: Estes testes requerem que o banco de dados esteja rodando.
 * Para executar os testes:
 * 1. Inicie o banco de dados: `docker compose up db`
 * 2. Em outro terminal execute os testes: `npm test` ou `npm test --users.test.js` ( para executar somente este arquivo )
 */

const request = require('supertest');
const app = require('../app');

describe('Testes de Endpoints: /api/users', () => {
  
  // Variável para armazenar o token obtido
  let authToken = null;
  // Variável para armazenar o ID do usuário criado nos testes
  let createdUserId = null;
  
  describe('1. Autenticação - Obter Token', () => {
    
    test('Deve fazer login e obter token válido', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@admin.com',
          password: 'admin'
        });
      
      // Validar resposta do login
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.token).toBeTruthy();
      
      // Armazenar o token para uso nos próximos testes
      authToken = response.body.token;
      
      console.log('✓ Token obtido com sucesso:', authToken.substring(0, 20) + '...');
    });

    test('Deve validar que o token foi armazenado', () => {
      expect(authToken).not.toBeNull();
      expect(typeof authToken).toBe('string');
      expect(authToken.length).toBeGreaterThan(0);
    });
  });

  describe('2. POST /api/users - Criar novo usuário', () => {
    
    test('Deve retornar 401 quando não estiver autenticado', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          username: 'Teste User',
          email: 'teste@example.com',
          password: 'senha123',
          profile_id: 2
        });
      
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    test('Deve criar usuário com sucesso usando token válido', async () => {
      const novoUsuario = {
        username: 'Usuario Teste',
        email: `teste${Date.now()}@example.com`, // Email único
        password: 'senha123',
        profile_id: 2,
        userdescription: 'Usuário criado para teste'
      };

      const response = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send(novoUsuario);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('username');
      expect(response.body.username).toBe(novoUsuario.username);
      expect(response.body.email).toBe(novoUsuario.email);
      
      // Armazenar ID para usar nos próximos testes
      createdUserId = response.body.id;
      
      console.log('✓ Usuário criado com ID:', createdUserId);
    });

    test('Deve retornar 500 ao tentar criar usuário com dados inválidos', async () => {
      const response = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          username: 'Teste',
          // Faltando email e password obrigatórios
          profile_id: 2
        });
      
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('3. GET /api/users - Listar todos os usuários', () => {
    
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

    test('Deve retornar 200 e lista de usuários incluindo o criado', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      
      // Validar estrutura dos usuários
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('username');
      expect(response.body[0]).toHaveProperty('email');
      
      // Verificar se o usuário criado está na lista
      const usuarioCriado = response.body.find(user => user.id === createdUserId);
      expect(usuarioCriado).toBeDefined();
      expect(usuarioCriado.username).toBe('Usuario Teste');
      
      console.log('✓ Usuário criado encontrado na listagem');
    });
  });

  describe('4. GET /api/users/:id - Buscar usuário por ID', () => {
    
    test('Deve retornar 401 quando não estiver autenticado', async () => {
      const response = await request(app)
        .get('/api/users/1');
      
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    test('Deve buscar o usuário criado pelo ID', async () => {
      const response = await request(app)
        .get(`/api/users/${createdUserId}`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('username');
      expect(response.body).toHaveProperty('email');
      expect(response.body.id).toBe(createdUserId);
      expect(response.body.username).toBe('Usuario Teste');
    });

    test('Deve retornar 404 quando usuário não existir', async () => {
      const response = await request(app)
        .get('/api/users/99999')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Usuário não encontrado');
    });
  });

  describe('5. PUT /api/users/:id - Atualizar usuário', () => {
    
    test('Deve retornar 401 quando não estiver autenticado', async () => {
      const response = await request(app)
        .put(`/api/users/${createdUserId}`)
        .send({
          username: 'Nome Atualizado'
        });
      
      expect(response.status).toBe(401);
    });

    test('Deve atualizar usuário com sucesso', async () => {
      const dadosAtualizados = {
        username: 'Usuario Atualizado',
        userdescription: 'Descrição atualizada'
      };

      const response = await request(app)
        .put(`/api/users/${createdUserId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(dadosAtualizados);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('username');
      expect(response.body.username).toBe('Usuario Atualizado');
      expect(response.body.userdescription).toBe('Descrição atualizada');
    });

    test('Deve retornar 404 ao tentar atualizar usuário inexistente', async () => {
      const response = await request(app)
        .put('/api/users/99999')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          username: 'Teste'
        });
      
      expect(response.status).toBe(404);
    });
  });

  describe('6. DELETE /api/users/:id - Deletar usuário', () => {
    
    test('Deve retornar 401 quando não estiver autenticado', async () => {
      const response = await request(app)
        .delete(`/api/users/${createdUserId}`);
      
      expect(response.status).toBe(401);
    });

    test('Deve retornar 404 ao tentar deletar usuário inexistente', async () => {
      const response = await request(app)
        .delete('/api/users/99999')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(404);
    });

    test('Deve deletar usuário com sucesso', async () => {
      const response = await request(app)
        .delete(`/api/users/${createdUserId}`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(204);
      
      console.log('✓ Usuário deletado com ID:', createdUserId);
    });

    test('Deve confirmar que o usuário foi deletado', async () => {
      const response = await request(app)
        .get(`/api/users/${createdUserId}`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(404);
    });
  });

});
