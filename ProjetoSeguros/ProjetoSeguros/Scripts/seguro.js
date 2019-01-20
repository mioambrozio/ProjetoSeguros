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
    var model = new SegurosModel($("#model").data("model"));
    ko.applyBindings(model, document.getElementById("form-seguros"));
});

var SegurosModel = function (data) {
    var self = ko.mapping.fromJS(data);
    self.numCliente.extend({
        required: {
            params: true,
            message: "O campo Cliente é obrigatório!"
        }
    });
    self.indTipo.extend({
        required: {
            params: true,
            message: "O campo Tipo é obrigatório!"
        }
    });
    self.objetoSegurado.extend({
        required: {
            params: true,
            message: "O campo Objeto segurado é obrigatório!"
        }
    });
    self.numSeguro = ko.observable();
    self.dscTipo = ko.observable("");
    self.indTipo.subscribe(function (valor) {
        self.dscTipo(valor == 1 ? 'Placa' : valor == 2 ? 'Endereço' : valor == 3 ? 'CPF' : '');
    });
    
    self.alert = ko.observable(false);
    self.messageError = ko.observable();
    self.salvar = function () {
        if (self.errors().length == 0) {
            $.post("/Home/SalvarSeguro", {
                numCliente: self.numCliente(),
                indTipo: self.indTipo(),
                objetoSegurado: self.objetoSegurado()
            }, function (data) {
                if (data.Sucesso) {
                    self.indTipo(undefined);
                    self.numCliente(undefined);
                    self.objetoSegurado(undefined);
                }
                alert(data.Mensagem);
            });
        } else {
            alert(self.errors());
        }
    };
    self.buscar = function () {
        $.post("/Home/Buscar", {
            numSeguro: self.numSeguro()
        }, function (data) {
            if (data.Sucesso) {
                self.indTipo(data.Resultado.indTipo);
                self.numCliente(data.Resultado.numCliente);
                self.objetoSegurado(data.Resultado.objetoSegurado);
            } else {
                alert(data.Mensagem);
            }
        });
    };
    self.errors = ko.validation.group(self);
    return self;
};