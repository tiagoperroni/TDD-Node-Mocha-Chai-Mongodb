const filmeController = require('../controller/filme.controller');

const routes = require('express').Router();

routes.get('/api/filmes', filmeController.getAll);
routes.get('/api/filmes/:id', filmeController.getById);
routes.post('/api/filmes', filmeController.cadastrarFilme);
routes.put('/api/filmes/:id', filmeController.atualizarFilme);
routes.delete('/api/filmes/:id', filmeController.deletarFilme);
routes.delete('/api/filmes/deletar/todos', filmeController.deletarTodosFilmes);

module.exports = routes;