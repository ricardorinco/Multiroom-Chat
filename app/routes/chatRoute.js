module.exports = function (server) {
    server.get('/chat', function (req, res) {
        server.app.controllers.chatController.chat(server, req, res);
    });
    
    server.post('/chat', function (req, res) {
        server.app.controllers.chatController.chat(server, req, res);
    });
};