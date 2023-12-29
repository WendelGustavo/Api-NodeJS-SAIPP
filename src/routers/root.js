const express = require('express');
const userController = require('../controller/usuarioController');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('<h1>API - SAIPP ( Sistema Autossustentavel de Irrigação para Pequenos Produtores )</h1>');
});

router.get('/sobre', (req, res) => {
  res.status(200).send(' { "version": "1.0.0", "name": "API - SAIPP ( Sistema Autossustentavel de Irrigação para Pequenos Produtores )", "Description": "API responsável por fornecer os serviços necessários para manter o aplicativo SAIPP"  } ');
});

router.post('/login', async (req, res) => {
  const loginResponse = await userController.login(req.body);
  res.status(loginResponse.status).send(loginResponse);
});

module.exports = router;
