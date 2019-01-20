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

errorMessage = function (message, title, onOK, onCancel, messageFake) {
    if ((typeof exibeErrosRodape !== 'undefined') && (exibeErrosRodape == 'True')) {
        $('#errorMessage p strong').text = title;
        $('#errorMessage p').text = message;

        $('#errorMessage').fadeToggle(1000, function () {
            setTimeout(function () {
                $('#errorMessage').fadeOut(2000);
            }, 3000);
        });
    } else {
        var guidCancel = guidGenerator();
        var guidOK = guidGenerator();;
        var guidLigthbox = guidGenerator();
        var sb = new stringBuilder();
        /// se não houver titulo o padrão é "Atenção!";
        if (IsNullOrWhiteSpace(title))
            title = "Atenção!";

        sb.append("<div style=\"display:block\" id=\"" + guidLigthbox + "\" class=\"lightbox\">");
        sb.append("<div class=\"light-bg\"></div>");
        sb.append('<div class="modal-content light-content">');
        sb.append('    <div class="modal-header erro">');
        sb.append('        <div class="bootstrap-dialog-header">');
        sb.append('            <div class="bootstrap-dialog-title"><i class="fas fa-exclamation-triangle"></i>' + title + '</div>');
        sb.append('        </div>');
        sb.append('    </div>');
        sb.append('    <div class="modal-body">');
        sb.append('        <div class="bootstrap-dialog-body">');
        sb.append('            <div class="bootstrap-dialog-message">');

        if (Array.isArray(message)) {
            $.each(message, function (i, v) {
                sb.append("* " + v + "<br>");
            });
        } else {
            sb.append(message);
        }

        sb.append('         </div>');
        sb.append('        </div>');
        sb.append('    </div>');
        sb.append('    <div class="modal-footer" style="display: block;">');
        sb.append('        <div class="bootstrap-dialog-footer">');
        sb.append('            <div class="bootstrap-dialog-footer-buttons">');

        if (onCancel == null)
            sb.append('<div class="btn-box"><a id="' + guidOK + '" href="#" class="btn btn-ok">OK</a></div>');
        else
            sb.append("<div class=\"btn-box\"><a id=\"" + guidOK + "\" href=\"#\" class=\"btn\">Confirmar</a><a id=\"" + guidCancel + "\" href=\"#\" class=\"btn -cancel\">Cancelar</a></div>");

        sb.append('            </div>');
        sb.append('        </div>');
        sb.append('    </div>');
        sb.append('</div>');
        sb.append('</div>');

        $(".content").append(sb.toString());

        var $dialogMessage = $('#' + guidLigthbox + ' .bootstrap-dialog-message');

        if ($dialogMessage.height() > 300)
            $dialogMessage.slimScroll({
                height: '300px'
            });

        $("#" + guidOK + "").focus();
        $("#" + guidOK + "").off("click").on("click", function () {
            if (onOK != null) {
                onOK($(this));
                $("#" + guidLigthbox + "").remove();
            } else {
                $("#" + guidLigthbox + "").remove();
            }
            return false;
        });

        if (onCancel != null) {
            $("#" + guidCancel + "").focus();
            $("#" + guidCancel + "").off("click").on("click", function () {
                onCancel($(this));
                $("#" + guidLigthbox + "").remove();
                return false;
            });
        }
    }
};

sucessMessage = function (message, title, onOK, onCancel, messageFake) {
    if ((typeof exibeErrosRodape !== 'undefined') && (exibeErrosRodape == 'True')) {
        $('#errorMessage p strong').text = title;
        $('#errorMessage p').text = message;

        $('#errorMessage').fadeToggle(1000, function () {
            setTimeout(function () {
                $('#errorMessage').fadeOut(2000);
            }, 3000);
        });
    } else {
        var guidCancel = guidGenerator();
        var guidOK = guidGenerator();;
        var guidLigthbox = guidGenerator();
        var sb = new stringBuilder();
        /// se não houver titulo o padrão é "Atenção!";
        if (IsNullOrWhiteSpace(title))
            title = "Atenção!";

        sb.append("<div style=\"display:block\" id=\"" + guidLigthbox + "\" class=\"lightbox\">");
        sb.append("<div class=\"light-bg\"></div>");
        sb.append('<div class="modal-content light-content">');
        sb.append('    <div class="modal-header">');
        sb.append('        <div class="bootstrap-dialog-header">');
        sb.append('            <div class="bootstrap-dialog-title" id="25d6abde-2208-4327-b49d-7e87fea87b95_title"><i class="fas fa-info-circle"></i>' + title + '</div>');
        sb.append('        </div>');
        sb.append('    </div>');
        sb.append('    <div class="modal-body">');
        sb.append('        <div class="bootstrap-dialog-body">');
        sb.append('            <div class="bootstrap-dialog-message">');

        if (Array.isArray(message)) {
            $.each(message, function (i, v) {
                sb.append("* " + v + "<br>");
            });
        } else {
            sb.append(message);
        }

        sb.append('         </div>');
        sb.append('        </div>');
        sb.append('    </div>');
        sb.append('    <div class="modal-footer" style="display: block;">');
        sb.append('        <div class="bootstrap-dialog-footer">');
        sb.append('            <div class="bootstrap-dialog-footer-buttons">');

        if (onCancel == null)
            sb.append('<div class="btn-box"><a id="' + guidOK + '" href="#" class="btn btn-ok">OK</a></div>');
        else
            sb.append("<div class=\"btn-box\"><a id=\"" + guidOK + "\" href=\"#\" class=\"btn\">Confirmar</a><a id=\"" + guidCancel + "\" href=\"#\" class=\"btn -cancel\">Cancelar</a></div>");

        sb.append('            </div>');
        sb.append('        </div>');
        sb.append('    </div>');
        sb.append('</div>');
        sb.append('</div>');

        $(".content").append(sb.toString());

        var $dialogMessage = $('#' + guidLigthbox + ' .bootstrap-dialog-message');

        if ($dialogMessage.height() > 300)
            $dialogMessage.slimScroll({
                height: '300px'
            });

        $("#" + guidOK + "").focus();
        $("#" + guidOK + "").off("click").on("click", function () {
            if (onOK != null) {
                onOK($(this));
                $("#" + guidLigthbox + "").remove();
            } else {
                $("#" + guidLigthbox + "").remove();
            }
            return false;
        });

        if (onCancel != null) {
            $("#" + guidCancel + "").focus();
            $("#" + guidCancel + "").off("click").on("click", function () {
                onCancel($(this));
                $("#" + guidLigthbox + "").remove();
                return false;
            });
        }
    }
};

warningMessage = function (message, title, onOK, onCancel, messageFake) {
    if ((typeof exibeErrosRodape !== 'undefined') && (exibeErrosRodape == 'True')) {
        $('#errorMessage p strong').text = title;
        $('#errorMessage p').text = message;

        $('#errorMessage').fadeToggle(1000, function () {
            setTimeout(function () {
                $('#errorMessage').fadeOut(2000);
            }, 3000);
        });
    } else {
        var guidCancel = guidGenerator();
        var guidOK = guidGenerator();;
        var guidLigthbox = guidGenerator();
        var sb = new stringBuilder();
        /// se não houver titulo o padrão é "Atenção!";
        if (IsNullOrWhiteSpace(title))
            title = "Atenção!";

        sb.append("<div style=\"display:block\" id=\"" + guidLigthbox + "\" class=\"lightbox\">");
        sb.append("<div class=\"light-bg\"></div>");
        sb.append('<div class="modal-content light-content">');
        sb.append('    <div class="modal-header erro">');
        sb.append('        <div class="bootstrap-dialog-header">');
        sb.append('            <div class="bootstrap-dialog-title" id="25d6abde-2208-4327-b49d-7e87fea87b95_title"><i class="fas fa-exclamation-triangle"></i>' + title + '</div>');
        sb.append('        </div>');
        sb.append('    </div>');
        sb.append('    <div class="modal-body">');
        sb.append('        <div class="bootstrap-dialog-body">');
        sb.append('            <div class="bootstrap-dialog-message">');

        if (Array.isArray(message)) {
            $.each(message, function (i, v) {
                sb.append("* " + v + "<br>");
            });
        } else {
            sb.append(message);
        }

        sb.append('         </div>');
        sb.append('        </div>');
        sb.append('    </div>');
        sb.append('    <div class="modal-footer" style="display: block;">');
        sb.append('        <div class="bootstrap-dialog-footer">');
        sb.append('            <div class="bootstrap-dialog-footer-buttons">');

        if (onCancel == null)
            sb.append('<div class="btn-box"><a id="' + guidOK + '" href="#" class="btn btn-ok">OK</a></div>');
        else
            sb.append("<div class=\"btn-box\"><a id=\"" + guidOK + "\" href=\"#\" class=\"btn\">Confirmar</a><a id=\"" + guidCancel + "\" href=\"#\" class=\"btn -cancel\">Cancelar</a></div>");

        sb.append('            </div>');
        sb.append('        </div>');
        sb.append('    </div>');
        sb.append('</div>');
        sb.append('</div>');

        $(".content").append(sb.toString());

        var $dialogMessage = $('#' + guidLigthbox + ' .bootstrap-dialog-message');

        if ($dialogMessage.height() > 300)
            $dialogMessage.slimScroll({
                height: '300px'
            });

        $("#" + guidOK + "").focus();
        $("#" + guidOK + "").off("click").on("click", function () {
            if (onOK != null) {
                onOK($(this));
                $("#" + guidLigthbox + "").remove();
            } else {
                $("#" + guidLigthbox + "").remove();
            }
            return false;
        });

        if (onCancel != null) {
            $("#" + guidCancel + "").focus();
            $("#" + guidCancel + "").off("click").on("click", function () {
                onCancel($(this));
                $("#" + guidLigthbox + "").remove();
                return false;
            });
        }
    }
};

confirmMessage = function (message, title, onOK, onCancel, messageFake) {
    if ((typeof exibeErrosRodape !== 'undefined') && (exibeErrosRodape == 'True')) {
        $('#errorMessage p strong').text = title;
        $('#errorMessage p').text = message;

        $('#errorMessage').fadeToggle(1000, function () {
            setTimeout(function () {
                $('#errorMessage').fadeOut(2000);
            }, 3000);
        });
    } else {
        var guidCancel = guidGenerator();
        var guidOK = guidGenerator();;
        var guidLigthbox = guidGenerator();
        var sb = new stringBuilder();
        /// se não houver titulo o padrão é "Atenção!";
        if (IsNullOrWhiteSpace(title))
            title = "Atenção!";

        sb.append("<div style=\"display:block\" id=\"" + guidLigthbox + "\" class=\"lightbox\">");
        sb.append("<div class=\"light-bg\"></div>");
        sb.append('<div class="modal-content light-content">');
        sb.append('    <div class="modal-header">');
        sb.append('        <div class="bootstrap-dialog-header">');
        sb.append('            <div class="bootstrap-dialog-title" id="25d6abde-2208-4327-b49d-7e87fea87b95_title"><i class="fas fa-exclamation-triangle"></i>' + title + '</div>');
        sb.append('        </div>');
        sb.append('    </div>');
        sb.append('    <div class="modal-body">');
        sb.append('        <div class="bootstrap-dialog-body">');
        sb.append('            <div class="bootstrap-dialog-message">');

        if (Array.isArray(message)) {
            $.each(message, function (i, v) {
                sb.append("* " + v + "<br>");
            });
        } else {
            sb.append(message);
        }

        sb.append('         </div>');
        sb.append('        </div>');
        sb.append('    </div>');
        sb.append('    <div class="modal-footer" style="display: block;">');
        sb.append('        <div class="bootstrap-dialog-footer">');
        sb.append('            <div class="bootstrap-dialog-footer-buttons">');

        if (onCancel == null)
            sb.append('<div class="btn-box"><a id="' + guidOK + '" href="#" class="btn btn-ok">OK</a></div>');
        else
            sb.append("<div class=\"btn-box\"><a id=\"" + guidOK + "\" href=\"#\" class=\"btn\">Sim</a><a id=\"" + guidCancel + "\" href=\"#\" class=\"btn -cancel\">Não</a></div>");

        sb.append('            </div>');
        sb.append('        </div>');
        sb.append('    </div>');
        sb.append('</div>');
        sb.append('</div>');

        $(".content").append(sb.toString());

        var $dialogMessage = $('#' + guidLigthbox + ' .bootstrap-dialog-message');

        if ($dialogMessage.height() > 300)
            $dialogMessage.slimScroll({
                height: '300px'
            });

        $("#" + guidOK + "").focus();
        $("#" + guidOK + "").off("click").on("click", function () {
            if (onOK != null) {
                onOK($(this));
                $("#" + guidLigthbox + "").remove();
            } else {
                $("#" + guidLigthbox + "").remove();
            }
            return false;
        });

        if (onCancel != null) {
            $("#" + guidCancel + "").focus();
            $("#" + guidCancel + "").off("click").on("click", function () {
                onCancel($(this));
                $("#" + guidLigthbox + "").remove();
                return false;
            });
        }
    }
};

confirmCancelMessage = function (message, title, onOK, onCancel, onSair, messageFake) {
    if ((typeof exibeErrosRodape !== 'undefined') && (exibeErrosRodape == 'True')) {
        $('#errorMessage p strong').text = title;
        $('#errorMessage p').text = message;

        $('#errorMessage').fadeToggle(1000, function () {
            setTimeout(function () {
                $('#errorMessage').fadeOut(2000);
            }, 3000);
        });
    } else {
        var guidSair = guidGenerator();
        var guidCancel = guidGenerator();
        var guidOK = guidGenerator();
        var guidLigthbox = guidGenerator();
        var sb = new stringBuilder();
        /// se não houver titulo o padrão é "Atenção!";
        if (IsNullOrWhiteSpace(title))
            title = "Atenção!";

        sb.append("<div style=\"display:block\" id=\"" + guidLigthbox + "\" class=\"lightbox\">");
        sb.append("<div class=\"light-bg\"></div>");
        sb.append('<div class="modal-content light-content">');
        sb.append('    <div class="modal-header">');
        sb.append('        <div class="bootstrap-dialog-header">');
        sb.append('            <div class="bootstrap-dialog-title" id="25d6abde-2208-4327-b49d-7e87fea87b95_title"><i class="fas fa-exclamation-triangle"></i>' + title + '</div>');
        sb.append('        </div>');
        sb.append('    </div>');
        sb.append('    <div class="modal-body">');
        sb.append('        <div class="bootstrap-dialog-body">');
        sb.append('            <div class="bootstrap-dialog-message">');

        if (Array.isArray(message)) {
            $.each(message, function (i, v) {
                sb.append("* " + v + "<br>");
            });
        } else {
            sb.append(message);
        }

        sb.append('         </div>');
        sb.append('        </div>');
        sb.append('    </div>');
        sb.append('    <div class="modal-footer" style="display: block;">');
        sb.append('        <div class="bootstrap-dialog-footer">');
        sb.append('            <div class="bootstrap-dialog-footer-buttons">');
        sb.append("                <div class=\"btn-box\"><a id=\"" + guidOK + "\" href=\"#\" class=\"btn\">Sim</a><a id=\"" + guidCancel + "\" href=\"#\" class=\"btn -cancel\" style=\"margin: 0px 0px 0px 10px;\">Não</a><a id=\"" + guidSair + "\" href=\"#\" class=\"btn -cancel\">Cancelar</a></div>");
        sb.append('            </div>');
        sb.append('        </div>');
        sb.append('    </div>');
        sb.append('</div>');
        sb.append('</div>');

        $(".content").append(sb.toString());

        var $dialogMessage = $('#' + guidLigthbox + ' .bootstrap-dialog-message');

        if ($dialogMessage.height() > 300)
            $dialogMessage.slimScroll({
                height: '300px'
            });

        $("#" + guidOK + "").focus();
        $("#" + guidOK + "").off("click").on("click", function () {
            if (onOK != null) {
                onOK($(this));
                $("#" + guidLigthbox + "").remove();
            } else {
                $("#" + guidLigthbox + "").remove();
            }
            return false;
        });

        if (onCancel != null) {
            $("#" + guidCancel + "").focus();
            $("#" + guidCancel + "").off("click").on("click", function () {
                onCancel($(this));
                $("#" + guidLigthbox + "").remove();
                return false;
            });
        }

        if (onSair != null) {
            $("#" + guidSair + "").focus();
            $("#" + guidSair + "").off("click").on("click", function () {
                onSair($(this));
                $("#" + guidLigthbox + "").remove();
                return false;
            });
        }
    }
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