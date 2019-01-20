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
    self.dscMaskObjSeg = ko.observable("");
    self.cpf = ko.observable(false);
    self.indTipo.subscribe(function (valor) {
        self.objetoSegurado(undefined);
        self.dscTipo(valor == 1 ? 'Placa' : valor == 2 ? 'Endereço' : valor == 3 ? 'CPF' : '');
        self.dscMaskObjSeg(valor == 3 ? '999.999.999-99' : '');
        self.cpf(valor == 3 ? true : false);
    });
    self.dscMask = ko.observable("");
    self.indTipoCliente = ko.observable();
    self.indTipoCliente.subscribe(function (valor) {
        self.numCliente(undefined);
        self.dscMask(valor == 1 ? '999.999.999-99' : '99.999.999/9999-99');
    });
    self.alert = ko.observable(false);
    self.messageError = ko.observable();
    self.salvar = function () {
        if (self.errors().length == 0) {
            $.post("/Home/SalvarSeguro", {
                numCliente: self.numCliente(),
                indTipo: self.indTipo(),
                objetoSegurado: self.objetoSegurado(),
                idSeguro: self.id()
            }, function (data) {
                if (data.Sucesso) {
                    self.limpar();
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
                self.indTipo(data.Resultado.indTipo == 1 ? '1' : data.Resultado.indTipo == 2 ? '2' : '3');
                self.objetoSegurado(data.Resultado.objetoSegurado);
                self.id(data.Resultado.id);
                self.indTipoCliente(data.Resultado.numCliente.length == 14 ? '1' : '2');
                self.numCliente(data.Resultado.numCliente);
            } else {
                self.limpar();
                alert(data.Mensagem);
            }
        });
    };

    self.errors = ko.validation.group(self);
    self.limpar = function () {
        self.indTipo(undefined);
        self.numCliente(undefined);
        self.objetoSegurado(undefined);
        self.id(undefined);
    }
    return self;
};