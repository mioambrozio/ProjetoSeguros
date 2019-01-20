$(document).ready(function () {
    ko.validation.init({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: false,
        parseInputAttributes: true,
        messageTemplate: null,
        decorateInputElement: true,
        errorElementClass: 'error'
    }, true);
    var model = new PequisarModel($("#model").data("model"));
    ko.applyBindings(model, document.getElementById("Login"));
});
var PequisarModel = function (data) {
    var self = ko.mapping.fromJS(data);
    self.usuario.extend({
        required: {
            params: true,
            message: "O campo Usuário é obrigatório!"
        }
    });
    self.senha.extend({
        required: {
            params: true,
            message: "O campo Senha é obrigatório!"
        }
    });
    self.Entrar = function () {
        if (self.errors().length == 0) {
            $.post("/Login/Entrar", {
                usuario: self.usuario(),
                senha: self.senha()
            }, function (data) {
                if (data.Sucesso) {
                    redirectRoute();
                }
            });
        } else {
            alert(self.errors());
        }
    };

    self.errors = ko.validation.group(self);
    return self;
};