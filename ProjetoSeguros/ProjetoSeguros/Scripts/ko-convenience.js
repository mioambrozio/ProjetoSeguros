//- Este arquivo requer "knockoutjs" e "knockout.validation".

//////////////////////////////////////////////////////////
//- Databinders
//////////////////////////////////////////////////////////
ko.bindingHandlers.numero = {
    /// Falta tratar o copy/paste do mouse
    /// data-bind="numero: ValorCustoMedio, mask: { aSign: '', aSep: '.', aDec: ',', mDec: '2', vMin: '100.00', vMax: '99999999.99' }, valueUpdate: ['afterkeydown', 'propertychange', 'input']"
    /// data-bind="numero: ValorCustoMedio, mask: { aSign: 'R$', aSep: '.', aDec: ',', mDec: '2', vMin: '0.00', vMax: '9999.99' }, valueUpdate: ['afterkeydown', 'propertychange', 'input']"

    init: function (el, valueAccessor, bindingsAccessor, viewModel) {
        var $el = $(el),
            value = valueAccessor(),
            mask = bindingsAccessor().mask || {};

        function getValor(vlr) {
            var resultado = parseFloat(vlr, 10);
            if (isNaN(resultado)) {
                resultado = null;
            }
            return resultado;
        }

        function updateModelValue() {
            var newValue = getValor($el.autoNumeric('get'));
            value(newValue);
        }

        //mask.aSign = mask.aSign || '';
        mask.aSep = mask.aSep || '.';
        mask.aDec = mask.aDec || ',';
        //mask.mDec = mask.mDec || 2;
        mask.vMin = mask.vMin || '0.00';
        mask.vMax = mask.vMax || '99999999.99';

        $el.autoNumeric(mask);
        $el.autoNumeric('set', getValor(ko.utils.unwrapObservable(value)));
        $el.change(updateModelValue);
    },
    update: function (el, valueAccessor, bindingsAccessor, viewModel) {
        var $el = $(el);
        var value = valueAccessor();

        function getValor(vlr) {
            var resultado = parseFloat(vlr, 10);
            if (isNaN(resultado)) {
                resultado = null;
            }
            return resultado;
        }

        var newValue = getValor(ko.utils.unwrapObservable(value));
        var elementValue = getValor($el.autoNumeric('get'));
        var valueHasChanged = newValue !== elementValue; //((newValue !== elementValue) && !(isNaN(elementValue) && isNaN(newValue)));

        if (newValue === 0 && elementValue !== 0 && elementValue !== "0") {
            valueHasChanged = true;
        }

        if (valueHasChanged) {
            $el.autoNumeric('set', newValue);
            if (newValue === null) {
                $el.val(null);
            }
            setTimeout(function () { try { $el.change(); } catch (e) { } }, 0);
        }
    }
};

//var jsonDateRE = /^\/Date\((-?\d+)(\+|-)?(\d+)?\)\/$/;
/// http://jsfiddle.net/rniemeyer/tbYPf/
ko.bindingHandlers.datepicker = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        $(element).mask("39/19/9999");
        //initialize datepicker with some optional options
        var options = allBindingsAccessor().datepickerOptions || {};
        $(element).datepicker(options);

        //handle the field changing
        ko.utils.registerEventHandler(element, "change", function () {
            var observable = valueAccessor();
            if (Frame_IsValidDate($(element).val())) {
                observable($(element).datepicker("getDate"));
            } else {
                observable(undefined);
                $(element).val('');
                $(element).datepicker("setDate", null);
            }
        });

        //handle disposal (if KO removes by the template binding)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).datepicker("destroy");
        });
    },
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()),
            current = $(element).datepicker("getDate");



        if (value !== current) {
            $(element).datepicker("setDate", value);
        }
    }
};

// converte uma data para texto com o formato 'DD/MM/YYYY'
ko.bindingHandlers.textDate = {
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        try {
            var value = ko.utils.unwrapObservable(valueAccessor());

            if (!IsNullOrWhiteSpace(value)) {
                if (value.toString().search('Date') >= 0 || value instanceof Date) {
                    value = moment(value).format('DD/MM/YYYY');
                    if (value) {
                        bindingContext.$data[$(element).data('bind').replace('textDate:', '').trim()] = value;
                    }
                }
            }

            $(element).text(value);
        } catch (e) {
            console.log({ mensagem: 'erro ao converter a data em texto, verifique o método: ko.bindingHandlers.textDate', erro: e });
        }
    }
};

// converte uma data para texto com o formato 'DD/MM/YYYY h:mm:ss'
ko.bindingHandlers.textDateTime = {
    update: function (element, valueAccessor) {
        try {
            var value = ko.utils.unwrapObservable(valueAccessor());

            if (!IsNullOrWhiteSpace(value)) {
                if (value.toString().search('Date') >= 0 || value instanceof Date) {
                    value = moment(value).format('DD/MM/YYYY HH:mm:ss');
                    if (value)
                        valueAccessor(value);
                }
            }

            $(element).text(value);
        } catch (e) {
            console.log({ mensagem: 'erro ao converter a data em texto, verifique o método: ko.bindingHandlers.textDateTime', erro: e });
        }
    }
};

// converte uma data para texto com o formato 'DD/MM/YYYY h:mm:ss'
ko.bindingHandlers.textDateTimeNoSeconds = {
    update: function (element, valueAccessor) {
        try {
            var value = ko.utils.unwrapObservable(valueAccessor());

            if (!IsNullOrWhiteSpace(value)) {
                if (value.toString().search('Date') >= 0 || value instanceof Date) {
                    value = moment(value).format('DD/MM/YYYY HH:mm');
                    if (value)
                        valueAccessor(value);
                }
            }

            $(element).text(value);
        } catch (e) {
            console.log({ mensagem: 'erro ao converter a data em texto, verifique o método: ko.bindingHandlers.textDateTimeNoSeconds', erro: e });
        }
    }
};

// converte uma data para texto com o formato 'h:mm:ss'
ko.bindingHandlers.textHours = {
    update: function (element, valueAccessor) {
        try {
            var value = ko.utils.unwrapObservable(valueAccessor());

            if (!IsNullOrWhiteSpace(value)) {
                if (value.toString().search('Date') >= 0 || value instanceof Date) {
                    value = moment(value).format('h:mm:ss');
                    if (value)
                        valueAccessor(value);
                }
            }

            $(element).text(value);
        } catch (e) {
            console.log({ mensagem: 'erro ao converter a data em texto, verifique o método: ko.bindingHandlers.textHours', erro: e });
        }
    }
};

ko.bindingHandlers.titleCase = {
    init: function (element, valueAccessor, allBindings) {
        var $element = $(element);
        var observable = ko.utils.unwrapObservable(valueAccessor());
        if (!IsNullOrWhiteSpace(observable))
            $element.text(observable.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }));
    },
    update: function (element, valueAccessor, allBindings) {
        var $element = $(element);
        var observable = ko.utils.unwrapObservable(valueAccessor());
        if (!IsNullOrWhiteSpace(observable))
            $element.text(observable.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }));
    }
};

ko.bindingHandlers.disableAll = {
    init: function (element, valueAccessor) {
        var $element = $(element);
        var observable = ko.utils.unwrapObservable(valueAccessor());

        if (observable === true) {
            $element.find('input', 'textarea', 'select', 'button', 'a').attr('disabled', 'disabled');
            $element.find('select').attr('disabled', 'disabled');
        }
    },
    update: function (element, valueAccessor) {
        var $element = $(element);
        var observable = ko.utils.unwrapObservable(valueAccessor());

        if (observable === true) {
            $element.find('input, textarea', 'select', 'button', 'a').attr('disabled', 'disabled');
            $element.find('select').attr('disabled', 'disabled');
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

ko.bindingHandlers.accordion = {
    init: function (element, valueAccessor) {
        var options = valueAccessor() || {};
        //setTimeout(function () {
        //    Frame_LoadAccordion($(element));
        //}, 300)

        //handle disposal (if KO removes by the template binding)
        //ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        //    $(element).accordion("destroy");
        //});
    },
    update: function (element, valueAccessor) {
        var options = valueAccessor() || {};
        $(element).show();
    }
};

ko.extenders.uppercase = function (target, option) {
    target.subscribe(function (newValue) {
        target(newValue.toUpperCase());
    });
    return target;
};

ko.bindingHandlers.upper = {
    init: function (element, valueAccessor, allBindings) {
        var $element = $(element);
        var valor = '';

        if ($element.is("input") && $element.attr('type') == 'text') {
            $element.on("focusin", function () {
                $element.attr("data-val", $element.val());
            });

            $element.on("focusout", function (event) {
                if ($element.attr("data-val") != undefined && $element.attr("data-val") != $element.val()) {
                    var str = $element.val();
                    if (str != '') {
                        str = str.trim();
                        while (str.search('  ') > 0) {
                            str = str.replace('  ', ' ');
                        }
                        $element.val(str);
                    }

                    $element.trigger("value-change");
                }

                $element.removeAttr("data-val");
            });

            $element.on('keypress', function (event) {
                var _invalidRule = 0;
                if ($element.attr("maxlength") > 0 && $element.val().length == $element.attr("maxlength")) _invalidRule = 1;
                if (event.ctrlKey || event.altKey || event.charCode == 13 || _invalidRule > 0) return; // se tecla de comandos, ignora;

                var recentChar = String.fromCharCode(event.which); // captura o caractere pressionado para tratamento;
                var appendChar = $element.getCursorPosition() == $element.val().length; // captura posição do cursor para controlar entrada no input (append ou insert);
                var charWorked = false; // flag indicando se caractere foi tratado;

                // Se for caractere especial, ignora seu processamento;
                if (recentChar.match(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/))
                    event.preventDefault();

                // se for um caractere alfa, converte em upperCase
                if (recentChar.match(/[a-z]/)) {
                    charWorked = true;
                    recentChar = recentChar.toUpperCase();
                }

                // se tiver acente, substitui pela vogal sem acento;
                if (recentChar.match(/[àâêôûãõáéíóúçüÀÂÊÔÛÃÕÁÉÍÓÚÇÜ]/)) {
                    charWorked = true;
                    recentChar = noTilde(recentChar);
                }

                // Se o caracter foi tratado...
                if (charWorked == true) {
                    if (appendChar) // De acordo com a posição do cursor, append char?
                        $element.val($element.val() + recentChar);
                    else { // insert Char e atualização caret;
                        oldVal = $element.val();
                        cursorPosition = $element.getCursorPosition();
                        firstPart = oldVal.substr(0, cursorPosition.Start);

                        // tratando caret com seleção maior que 0;
                        if (cursorPosition.Start == cursorPosition.End)
                            secundPart = oldVal.substr(cursorPosition.Start, $element.val().length);
                        else
                            secundPart = oldVal.substr(cursorPosition.End, $element.val().length);

                        newVal = firstPart + recentChar + secundPart;
                        $element.val(newVal);
                        $element.selectRange(cursorPosition.Start + 1);
                    }

                    event.preventDefault();
                }
            });

            $element.off('paste').on('paste', function (event) {
                var _this = this;
                setTimeout(function () {
                    $(_this).val(prepareString($(_this).val())); // formata a string colada no campo;
                }, 100);
            });

            $element.on('value-change', function ($el) {
                var observable = valueAccessor();
                observable($($el.target).val());
            });
        }
    },
    update: function (element, valueAccessor) {
        var observable = valueAccessor();

        var value = ko.utils.unwrapObservable(valueAccessor()),
            current = $(element).val();

        if (value !== current) {
            $(element).val(value);
        }
    }
};


ko.bindingHandlers.showHide = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var val = ko.utils.unwrapObservable(valueAccessor());
        if (val) {
            $(element).show("fast");
        } else {
            $(element).hide("fast");
        }
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var val = ko.utils.unwrapObservable(valueAccessor());

        if (val) {
            $(element).show("fast");
        } else {
            $(element).hide("fast");
        }
    }
};

//- http://bgrins.github.com/spectrum
ko.bindingHandlers.spectrum = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var customPicker = allBindingsAccessor().customPicker || {
            showPaletteOnly: true,
            togglePaletteOnly: true,
            togglePaletteMoreText: 'Mais',
            togglePaletteLessText: 'Menos',
            cancelText: 'Cancelar',
            chooseText: 'Confirmar',
            //color: 'transparent',
            preferredFormat: "hex",
            palette: [
                ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
                ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
                ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
                ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
                ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
                ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
                ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
                ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
            ]
        };
        var value = valueAccessor();
        $(element).val(ko.utils.unwrapObservable(value));
        $(element).spectrum(customPicker);
        $(element).change(function () { value(this.value); });
    },
    update: function (element, valueAccessor) {
        $(element).val(ko.utils.unwrapObservable(valueAccessor()));
    }
};

ko.observableArray.fn.distinct = function (prop) {
    var target = this;
    target.index = {};
    target.index[prop] = ko.observable({});

    ko.computed(function () {
        var propIndex = {};

        ko.utils.arrayForEach(target(), function (item) {
            var key = ko.utils.unwrapObservable(item[prop]);
            if (key) {
                propIndex[key] = propIndex[key] || [];
                propIndex[key].push(item);
            }
        });

        target.index[prop](propIndex);
    });

    return target;
};

//////////////////////////////////////////////////////////
//- Validações customizadas
//////////////////////////////////////////////////////////
//ko.validation.rules['conditional_required'] = {
//    validator: function (val, condition) {
//        var required = false;
//        if (typeof condition == 'function') {
//            required = condition();
//        }
//        else {
//            required = condition;
//        }
//        if (required) {
//            return !(val == undefined || val == null || val.length == 0);
//        }
//        else {
//            return true;
//        }
//    },
//    message: ko.validation.rules.required.message
//}
//ko.validation.registerExtenders();

ko.observableArray.fn.sortByProperty = function (prop, asc) {
    if (asc) {
        this.sort(function (obj1, obj2) {
            if (obj1[prop] == obj2[prop]) {
                return 0;
            } else if (obj1[prop] < obj2[prop]) {
                return -1;
            } else {
                return 1;
            }
        });
    } else {
        this.sort(function (obj1, obj2) {
            if (obj1[prop] == obj2[prop]) {
                return 0;
            } else if (obj1[prop] > obj2[prop]) {
                return -1;
            } else {
                return 1;
            }
        });
    }
};

ko.dirtyFlag = function (root, isInitiallyDirty) {
    var result = function () { },
        _initialState = ko.observable(ko.toJSON(root)),
        _isInitiallyDirty = ko.observable(isInitiallyDirty);
    result.isDirty = ko.computed(function () {
        return _isInitiallyDirty() || _initialState() !== ko.toJSON(root);
    });
    result.reset = function () {
        _initialState(ko.toJSON(root));
        _isInitiallyDirty(false);
    };
    return result;
};

ko.bindingHandlers.ajaxDesabilita = {

    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        try {
            $(element).setDisableInAjax();
        } catch (e) {
            console.log({ mensagem: 'erro ao setar o elemento para desabilitar nas requisições ajax, descrição do método: ko.bindingHandlers.disableInAjax', erro: e });
        }
    }
};

//////////////////////////////////////////////////////////
//- SEMPRE POR ULTIMO
//- Registrando os custom databind com o knockoutValidation
//////////////////////////////////////////////////////////
ko.validation.makeBindingHandlerValidatable('numero');
ko.validation.makeBindingHandlerValidatable('datepicker');
ko.validation.makeBindingHandlerValidatable('masked');
ko.validation.makeBindingHandlerValidatable('upper');
ko.validation.makeBindingHandlerValidatable('spectrum');
//////////////////////////////////////////////////////////
//- FIM Registrando os custom databind com o knockoutValidation
//- FIM SEMPRE POR ULTIMO
//////////////////////////////////////////////////////////


/* ////////////////////////////////////////////////////////////////////////////////// */
/*
 * Parametrização
 * @param {any} paginacao = {
 *     Lista: array com a lista original (opcional, padrão é [])
 *     callbackMapping: função de customização do mapping
 *     PageNumber: número da página para se iniciar (opcional, padrão é 0)
 *     PageSize: linhas por página (opcional, padrão é 16). Valores possíveis são: 10, 12, 14, 16, 18, 20, 22.
 *     ControlaLoading: id do elemento a ser aplicado a div loading.
 * }
 */
var Paginacao = function (paginacao) {
    var pag = this;
    pag.paginacao = paginacao || {};
    pag.Lista = ko.observableArray([]);
    if (pag.paginacao.callbackMapping) {
        pag.Lista(ko.utils.arrayMap(pag.paginacao.Lista || [], function (item) {
            return pag.paginacao.callbackMapping(item);
        }));
    } else {
        pag.Lista(ko.utils.arrayMap(pag.paginacao.Lista || [], function (item) {
            return ko.mapping.fromJS(item);
        }));
    }
    pag.ListaSubstitui = function (novaLista) {
        if (pag.paginacao.ControlaLoading) { pag.paginacao.ControlaLoading.loading("Aguarde, carregando..."); }
        pag.Lista(ko.utils.arrayMap(novaLista || [], function (item) {
            return typeof pag.paginacao.callbackMapping === 'function'
                ? pag.paginacao.callbackMapping(item)
                : ko.mapping.fromJS(item);
        }));
        if (pag.paginacao.ControlaLoading) { pag.paginacao.ControlaLoading.unloading(); }
    };
    pag.ListaAdiciona = function (novaLista) {
        if (pag.paginacao.ControlaLoading) { pag.paginacao.ControlaLoading.loading("Aguarde, carregando..."); }
        novaLista = novaLista || [];
        var listaFinal = pag.Lista();
        for (var i = 0; i < novaLista.length; i++) {
            listaFinal.push(typeof pag.paginacao.callbackMapping === 'function'
                ? pag.paginacao.callbackMapping(novaLista[i])
                : listaFinal.push(ko.mapping.fromJS(novaLista[i]))
            );
        }
        pag.Lista.valueHasMutated();
        if (pag.paginacao.ControlaLoading) { pag.paginacao.ControlaLoading.unloading(); }
    };
    pag.ListaRemove = function (velhaLista) {
        if (pag.paginacao.ControlaLoading) { pag.paginacao.ControlaLoading.loading("Aguarde, carregando..."); }
        velhaLista = velhaLista || [];
        var listaFinal = pag.Lista();
        for (var i = 0; i < velhaLista.length; i++) {
            listaFinal.splice(listaFinal.indexOf(velhaLista[i]), 1);
        }
        pag.Lista.valueHasMutated();
        pag.PageNumber(pag.PageNumber() > pag.totalPages() ? pag.totalPages() : pag.PageNumber());
        if (pag.paginacao.ControlaLoading) { pag.paginacao.ControlaLoading.unloading(); }
    };
    pag.PageNumber = ko.observable(pag.paginacao.PageNumber || 0).extend({ notify: 'always' });
    pag.PageSize = ko.observable(pag.paginacao.PageSize || 16);
    pag.totalPages = ko.pureComputed(function () {
        var div = Math.floor(pag.Lista().length / pag.PageSize());
        div += pag.Lista().length % pag.PageSize() > 0 ? 1 : 0;
        return div;
    });
    pag.ListaPaginada = ko.pureComputed(function () {
        var first = pag.PageNumber() * pag.PageSize();
        var listArray = pag.Lista().slice(first, first + pag.PageSize());
        return listArray;
    });
    pag.temPaginaAnterior = ko.pureComputed(function () {
        return pag.totalPages() > 1 && pag.PageNumber() > 0;
    });
    pag.anterior = function () {
        if (pag.PageNumber() > 0) {
            pag.PageNumber(pag.PageNumber() - 1);
        }
    };
    pag.temPaginaProxima = ko.pureComputed(function () {
        return pag.totalPages() > 1 && pag.PageNumber() + 1 < pag.totalPages();
    });
    pag.proxima = function () {
        if (pag.PageNumber() < pag.totalPages()) {
            pag.PageNumber(pag.PageNumber() + 1);
        }
    };
    pag.pageNumberDS = ko.pureComputed(function () {
        listaPaginas = [];
        for (var i = 0; i < pag.totalPages(); i++) {
            listaPaginas.push({ Codigo: i, Descricao: i + 1 });
        }
        return listaPaginas;
    });
    pag.pageSizeDS = ko.pureComputed(function () {
        return [{ ps: 10 }, { ps: 12 }, { ps: 14 }, { ps: 16 }, { ps: 18 }, { ps: 20 }, { ps: 22 }];
    });
};
/* ////////////////////////////////////////////////////////////////////////////////// */
