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
    ko.applyBindings(model, document.getElementById("form-excluir"));
});

var PequisarModel = function (data) {
    self.numSeguro = ko.observable();
    self.numSeguro.extend({
        required: {
            params: true,
            message: "O campo Número do Seguro é obrigatório!"
        }
    });
    self.buscar = function () {
        if (self.errors().length == 0) {
            $.post("/Home/BuscarParaExcluir", {
                numSeguro: self.numSeguro()
            }, function (data) {
                if (data.Sucesso) {
                    $('#myModal').show();
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