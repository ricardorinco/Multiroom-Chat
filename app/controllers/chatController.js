module.exports.chat = function (server, req, res) {
    var formData = req.body;

    req.assert('nickname', 'Você deve informar um apelido.').notEmpty();
    req.assert('nickname', 'Seu apelido deve conter entre 3 e 15 caracteres').len(3, 15);

    req.getValidationResult()
        .then(function (errors) {
            if (!errors.isEmpty()) {
                res.render('index', { validation: errors.array(), data: formData });
            } else {
                server.get('io').emit('reportNewMessage', { nickname: formData.nickname, message: 'Olá pessoal, acabei de entrar no chat.' });
                res.render('chat', { data: formData });
            }
        });
};