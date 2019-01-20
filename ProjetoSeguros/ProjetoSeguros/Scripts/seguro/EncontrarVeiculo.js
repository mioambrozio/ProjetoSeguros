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
    var model = new EncontrarModel($("#model").data("model"));
    ko.applyBindings(model, document.getElementById("form-encontrar"));
});

var EncontrarModel = function (data) {
    var self = ko.mapping.fromJS(data);
    self.numPlaca.extend({
        required: {
            params: true,
            message: "O campo Placa do veículo é obrigatório!"
        }
    });
    self.buscar = function () {
        if (self.errors().length == 0) {
            $.post("/Home/Filtrar", {
                indOpcao: 1,
                numPlaca: self.numPlaca()
            }, function (data) {
                if (data.Sucesso) {
                    alert(data.Mensagem);
                    self.dscObjetoSegurado(data.Resultado.dscObjetoSegurado);
                    self.id(data.Resultado.id);
                    self.indTipo(data.Resultado.indTipo);
                    self.numCliente(data.Resultado.numCliente);
                    self.objetoSegurado(data.Resultado.objetoSegurado);
                } else {
                    alert(data.Mensagem);
                }
            });
        }
        else
            alert(self.errors());
    };

    self.dialogClose = function () {
        $('#myModal').attr('style', 'display:none');
    };

    self.dialogConfirm = function () {
        $.post("/Home/ConfirmaExcluir", {
            numSeguro: self.numSeguro()
        }, function (data) {
            if (data.Sucesso) {
                alert(data.Mensagem);
                self.numSeguro(undefined);
            } else {
                alert(data.Mensagem);
            }
            self.dialogCancel();
        });
    };

    self.dialogCancel = function () {
        $('#myModal').attr('style', 'display:none');
    };

    self.errors = ko.validation.group(self);

    return self;
};