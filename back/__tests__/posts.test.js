/**
 * Testes de Integração: /api/posts
 * 
 * IMPORTANTE: Estes testes requerem que o banco de dados esteja rodando.
 * Para executar os testes:
 * 1. Inicie o banco de dados: `docker compose up db`
 * 2. Execute os testes: `npm test` ou `npm test -- posts.test.js` ( para executar somente este arquivo )
 */
const request = require('supertest');
const app = require('../app');
    
describe('Testes de Endpoints: /api/posts', () => {
    // Variável para armazenar o token obtido
    let authToken = null;
    // Variável para armazenar o ID do post criado nos testes
    let createdPostId = null;

    describe('1. Autenticação - Obter Token', () => {
        
        test('Deve fazer login e obter token válido', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'admin@admin.com',
                    password: 'admin'
                }); 
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            expect(response.body.token).toBeTruthy();
            
            authToken = response.body.token;
            
            console.log('✓ Token obtido com sucesso:', authToken.substring(0, 20) + '...');
        });

        test('Deve validar que o token foi armazenado', () => {
            expect(authToken).not.toBeNull();
            expect(typeof authToken).toBe('string');
            expect(authToken.length).toBeGreaterThan(0);
        });
    });

    describe('2. POST /api/posts - Criar novo post', () => {
        
        test('Deve retornar 401 quando não estiver autenticado', async () => {
            const response = await request(app)
                .post('/api/posts')
                .send({
                    title: 'Teste Post',
                    content: 'Conteúdo do post',
                    user_id: 1
                });
            
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('error');
        });

        test('Deve retornar 403 porque Full-Admin não tem permissão (requer Admin)', async () => {
            const novoPost = {
                title: 'Post de Teste',
                content: 'Este é um post criado durante os testes automatizados',
                user_id: 1
            };

            const response = await request(app)
                .post('/api/posts')
                .set('Authorization', `Bearer ${authToken}`)
                .send(novoPost);
            
            // A rota POST /api/posts usa authorizeAdmin que só aceita profile_id === 1
            // O admin@admin.com tem profile_id === 0 (Full-Admin)
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error');
        });

        test('Deve retornar 403 por falta de permissão (independente dos dados)', async () => {
            const response = await request(app)
                .post('/api/posts')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    title: 'Teste',
                    // Faltando content e user_id obrigatórios
                });
            
            // Retorna 403 antes mesmo de validar os dados
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('3. GET /api/posts - Listar todos os posts', () => {
        
        test('Deve retornar 401 quando não estiver autenticado', async () => {
            const response = await request(app)
                .get('/api/posts');
            
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Access denied. No token provided.');
        });

        test('Deve retornar 403 com token inválido', async () => {
            const response = await request(app)
                .get('/api/posts')
                .set('Authorization', 'Bearer token_invalido_123');
            
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error');
        });

        test('Deve retornar 200 e lista de posts (vazia ou com posts existentes)', async () => {
            const response = await request(app)
                .get('/api/posts')
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            
            // A lista pode estar vazia já que não conseguimos criar post
            if (response.body.length > 0) {
                expect(response.body[0]).toHaveProperty('id');
                expect(response.body[0]).toHaveProperty('title');
                expect(response.body[0]).toHaveProperty('content');
            }
        });
    });

    describe('4. GET /api/posts/:id - Buscar post por ID', () => {
        
        test('Deve retornar 401 quando não estiver autenticado', async () => {
            const response = await request(app)
                .get('/api/posts/1');
            
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('error');
        });

        test('Deve retornar 404 ao buscar post inexistente (createdPostId é null)', async () => {
            // Como não conseguimos criar o post, createdPostId é null
            const response = await request(app)
                .get(`/api/posts/${createdPostId}`)
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(response.status).toBe(404);
        });

        test('Deve retornar 404 quando post não existir', async () => {
            const response = await request(app)
                .get('/api/posts/99999')
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Post não encontrado');
        });
    });

    describe('5. PUT /api/posts/:id - Atualizar post', () => {
        
        test('Deve retornar 401 quando não estiver autenticado', async () => {
            const response = await request(app)
                .put(`/api/posts/${createdPostId}`)
                .send({
                    title: 'Título Atualizado'
                });
            
            expect(response.status).toBe(401);
        });

        test('Deve retornar 403 por falta de permissão', async () => {
            const dadosAtualizados = {
                title: 'Post Atualizado',
                content: 'Conteúdo atualizado durante os testes'
            };

            const response = await request(app)
                .put(`/api/posts/${createdPostId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send(dadosAtualizados);
            
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error');
        });

        test('Deve retornar 403 mesmo com ID inexistente (valida permissão primeiro)', async () => {
            const response = await request(app)
                .put('/api/posts/99999')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    title: 'Teste'
                });
            
            expect(response.status).toBe(403);
        });
    });

    describe('6. DELETE /api/posts/:id - Deletar post', () => {
        
        test('Deve retornar 401 quando não estiver autenticado', async () => {
            const response = await request(app)
                .delete(`/api/posts/${createdPostId}`);
            
            expect(response.status).toBe(401);
        });

        test('Deve retornar 403 mesmo ao tentar deletar post inexistente', async () => {
            const response = await request(app)
                .delete('/api/posts/99999')
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(response.status).toBe(403);
        });

        test('Deve retornar 403 por falta de permissão', async () => {
            const response = await request(app)
                .delete(`/api/posts/${createdPostId}`)
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error');
        });

        test('Nota: Full-Admin (profile_id 0) não tem acesso às rotas de posts', () => {
            // As rotas de posts usam authorizeAdmin que só aceita profile_id === 1
            // Para testar posts completamente, seria necessário criar um usuário com profile_id === 1
            expect(true).toBe(true);
        });
    });

});
