guidGenerator = function () {
    var S4 = function () {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    };
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
};

function stringBuilder(value) {
    this.strings = new Array("");
    this.append(value);
}

stringBuilder.prototype.append = function (value) {
    if (value) {
        this.strings.push(value);
    }
}

stringBuilder.prototype.clear = function () {
    this.strings.length = 1;
}

stringBuilder.prototype.toString = function () {
    return this.strings.join("");
}
var IsNullOrWhiteSpace = function (value) {
    if (value == null) return true;

    return $.trim(value).length == 0;
}

ajax = function (action, param, functionSucess, syn, loading, fnNoAccess) {
    var $elementLoading = IsNullOrWhiteSpace(loading) ? $('body') : $("#" + loading);

    pingServer(function (serverAvailable) {
        if (serverAvailable) {
            var paramdata = JSON.stringify($.extend(true, param, { session: guidGenerator() }));
            var options = {
                url: action,
                async: syn == undefined ? true : syn,
                type: 'POST',
                data: paramdata,
                contentType: 'application/json'
            };
            options.success = function (data) {
                Frame_EnableAfterAjax();

                if (typeof data === "string" && Frame_IsJSON(data))
                    data = JSON.parse(data);

                if (data && data.exeption == "exeption") {
                    errorMessage(data.message, "Erro no Sistema.", null, null, true);
                    unloading();
                }
                else if (data && data.sessao == "expirada") {
                    redirectRoute(getGlobalUrl(), { sessaoExpirada: true });

                    resetTimer();
                    unloading();
                }
                else {
                    resetTimer();
                    setTimer();

                    unloading();

                    functionSucess(data);
                }
            };
            options.error = function (jqXHR, textStatus, errorThrown) {
                Frame_EnableAfterAjax();
                alert(errorThrown);
                unloading();
            };
            var xhr = $.ajax(options);
            options.xhr = xhr;

            return xhr;
        }
    });

    function unloading() {
        setTimeout(function () {
            $elementLoading.unloading();
        }, 500);
    }
}

pingServer = function (callBackServerPing) {
    callBackServerPing(true);
}

redirectRoute = function (url, param) {
    if (url == "" || url == undefined)
        url = "/Home/Index";

    var host = $(location).init()[0].origin + url;
    $(location).attr('href', host);    
};

ko.bindingHandlers.masked = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var mask = allBindingsAccessor().mask || {};

        if (ko.isObservable(mask)) {
            $(element).mask(mask());
            mask.subscribe(function (newValue) {
                $(element).mask(newValue);
            });
        }
        else {
            $(element).mask(mask);
        }

        ko.utils.registerEventHandler(element, 'focusout', function () {
            var observable = valueAccessor();
            observable($(element).val());
        });

        //handle disposal (if KO removes by the template binding)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).mask("destroy");
        });
    },
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        $(element).val(value);
    }
};

ko.validation.makeBindingHandlerValidatable('masked');