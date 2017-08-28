// Importação dos módulos
var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var consign = require('consign');

// Iniciando o objeto do express
var server = express();
// Setando variáveis 'view engine' e 'views' do express
server.set('view engine', 'ejs');
server.set('views', './app/views');
// Configuração dos middleware
server.use(express.static('./app/public'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(expressValidator());

// Efetuando o auto-loading das rotas, models e controllers
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(server);

module.exports = server;