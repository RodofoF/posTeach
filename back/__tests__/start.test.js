describe('1. Sanity Check (Validação da ferramenta de teste JEST)', () => {
  test('Deve garantir que 1 + 1 é igual a 2', () => {
    expect(1 + 1).toBe(2);
  });
});

describe('2. Testes de Inicial de Endpoint: GET Básico', () => {
  const request = require('supertest');
  const app = require('../app');

  test('GET / - Deve retornar a mensagem de boas-vindas', async () => {
    const response = await request(app).get('/');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Hello from Posteach-Backend!');
    expect(response.body).toHaveProperty('docs');
  });

  test('GET / - Deve retornar um JSON válido', async () => {
    const response = await request(app).get('/');
    
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toBeDefined();
  });
});