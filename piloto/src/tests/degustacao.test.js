const request = require('supertest');
const app = require('../index'); // Express
const jwt = require('jsonwebtoken');

const gerarTokenValido = () => {
  return jwt.sign({ id: 8, nome: "Degustador Teste" }, 'security_key', { expiresIn: '1h' });
};

describe('/api/degustacao', () => {
  let token;
  let idDegustacaoCriada;
  let idReceitaExistente = "Frango Cremoso";
  let nomeCozinheiro = 6;
  let idDegustador = 8;

  beforeAll(() => {
    token = gerarTokenValido();
  });

  const degustacaoValida = {
    "nota_degustacao": 3.5,
    "data_degustacao": "2025-06-21",
    "FKnome_rct": idReceitaExistente,
    "FKcozinheiro": nomeCozinheiro,
    "FKdegustador": idDegustador,
    "comentario": "Receita deliciosa e bem temperada!"
  };

  
test('Deve criar uma nova degustação (POST /degustacao)', async () => {
    const res = await request(app)
      .post('/api/degustacao')
      .set('Authorization', `Bearer ${token}`)
      .send(degustacaoValida);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    idDegustacaoCriada = res.body.id;
  });

 test('Deve listar degustações (GET /degustacao)', async () => {
    const res = await request(app)
      .get('/api/degustacao')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    console.log(res.body);
  });

//    test('Deve buscar uma degustação por ID (GET /degustacao/:id)', async () => {
//     const res = await request(app)
//       .get(`/api/degustacao/${idDegustacaoCriada}`)
//       .set('Authorization', `Bearer ${token}`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty('idDegustacao', idDegustacaoCriada);
//     console.log(res.body);
//   });

//  test('Deve atualizar uma degustação (PUT /degustacao/:id)', async () => {
//     const atualizada = { ...degustacaoValida, "nota_degustacao": 2.0 };
//     const res = await request(app)
//       .put(`/api/degustacao/${idDegustacaoCriada}`)
//       .set('Authorization', `Bearer ${token}`)
//       .send(atualizada);

//     expect(res.statusCode).toBe(200);
//     expect(res.body.message).toBe('Degustação atualizado com sucesso');
//   });


//   test('Deve deletar uma degustação (DELETE /degustacao/:id)', async () => {
//     const res = await request(app)
//       .delete(`/api/degustacao/43`)
//       .set('Authorization', `Bearer ${token}`);

//     expect(res.statusCode).toBe(200);
//   });


 /* test('Não deve permitir requisições sem autenticação', async () => {
    const res = await request(app)
      .get('/api/degustacao');

    expect(res.statusCode).toBe(401); // ou 403
  });*/
});