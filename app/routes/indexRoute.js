module.exports = function (server) {
    server.get('/', function (req, res) {
        server.app.controllers.indexController.index(server, req, res);
    });
};