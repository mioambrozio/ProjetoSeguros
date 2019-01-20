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
    ko.applyBindings(model, document.getElementById("form-pesquisar"));
});
var PequisarModel = function (data) {
    var self = ko.mapping.fromJS(data);

    self.lista(ko.utils.arrayMap(ko.toJS(data.lista), function (data) {
        return ko.mapping.fromJS(data);
    }));

    self.errors = ko.validation.group(self);
    return self;
};