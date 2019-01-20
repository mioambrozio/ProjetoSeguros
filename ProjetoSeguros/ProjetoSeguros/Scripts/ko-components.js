/// pesquisa de paises
ko.components.register('pesquisa-pais', {
    viewModel: function (params) {
        var self = this;
        self.NomPais = params.nome;
        self.CodPais = params.codigo;
        self.habilitar = ko.isObservable(params.habilitar) ? params.habilitar : ko.observable(params.habilitar);
        self.pesquisar = function () {
            if (self.habilitar())
                pesquisaPais(function (paisSelecionado) {
                    /////valida se houve um retorno
                    if (paisSelecionado !== undefined) {
                        self.CodPais(paisSelecionado.codigo);
                        self.NomPais(paisSelecionado.nome);
                    };
                })
        };
    },
    template:
        '<div class="form-fieldset -search-full" style="width: 100%;">\
            <label class="form-label">País</label>\
            <input type="text" data-bind="value: NomPais" data-disabled="true" class="form-input" disabled="disabled">\
            <a title="buscar" data-bind="click: pesquisar, attr: { \'disabled\': habilitar() ? false : \'disabled\' }" class="form-input-btn focus" href="#">buscar</a>\
        </div>'
});

/// pesquisa de municipios
ko.components.register('pesquisa-municipio', {
    viewModel: function (params) {
        var self = this;
        self.NomMunicipio = params.nome;
        self.CodMunicipio = params.codigo;
        self.CodUf = params.uf;
        self.CodOficialMunicipio = ko.isObservable(params.codOficialMunicipio) ? params.codOficialMunicipio : ko.observable(0);
        self.habilitar = ko.isObservable(params.habilitar) ? params.habilitar : ko.observable(true);
        self.pesquisa = function () {
            if (self.habilitar())
                pesquisaMunicipio(function (municipioSelecionado) {
                    /////valida se houve um retorno
                    if (municipioSelecionado !== undefined) {
                        self.CodMunicipio(municipioSelecionado.codMunicipio);
                        self.NomMunicipio(municipioSelecionado.nomeMunicipio);
                        self.CodUf(municipioSelecionado.codUF);
                        self.CodOficialMunicipio(municipioSelecionado.codOficialMunicipio);
                    }
                });
        }
    },
    template:
        '<div class="form-fieldset -search-full" style="width: 100%;">\
            <label class="form-label">Município</label>\
            <input data-disabled="true" disabled="disabled" type="text" data-bind="value: NomMunicipio" class="form-input" />\
            <a title="buscar" id="" data-bind="click: pesquisa, attr: { \'disabled\': habilitar() ? false : \'disabled\' }" class="form-input-btn focus" href="#">buscar</a>\
        </div>'
});

/// pesquisa de profissional
ko.components.register('pesquisa-profissional', {
    /// <summary>
    /// pesquisa de profissional
    /// </summary>
    /// <param name="idQuery" type="int"> utiliza 2 como default</param>
    /// <param name="NomeLegendaProfissional" type="text">utiliza "Pesquisa Profissional" como default.</param>
    viewModel: function (params) {
        var self = this;
        if (params.idQuery == undefined) {
            params.idQuery = 3;
        }

        if (params.NomeLegendaProfissional == undefined) {
            params.NomeLegendaProfissional = "Pesquisa Profissional";
        }
        self.NomeLegendaProfissional = ko.isObservable(params.NomeLegendaProfissional) ? params.NomeLegendaProfissional : ko.observable(params.NomeLegendaProfissional || undefined);
        self.CodProfissional = ko.isObservable(params.CodProfissional) ? params.CodProfissional : ko.observable(params.CodProfissional || undefined);
        self.NomeProfissional = ko.isObservable(params.NomeProfissional) ? params.NomeProfissional : ko.observable(params.NomeProfissional || undefined);
        self.SiglaOrgao = ko.isObservable(params.SiglaOrgao) ? params.SiglaOrgao : ko.observable(params.SiglaOrgao || undefined);
        self.NumeroConselhoRegional = ko.isObservable(params.NumeroConselhoRegional) ? params.NumeroConselhoRegional : ko.observable(params.NumeroConselhoRegional || undefined);
        self.CodUF = ko.isObservable(params.CodUF) ? params.CodUF : ko.observable(params.CodUF || undefined);
        self.CodProfissionalConselho = ko.isObservable(params.CodProfissionalConselho) ? params.CodProfissionalConselho : ko.observable(params.CodProfissionalConselho || undefined);
        self.CodFcesProfissionalConselho = ko.isObservable(params.CodFcesProfissionalConselho) ? params.CodFcesProfissionalConselho : ko.observable(params.CodFcesProfissionalConselho || undefined);
        self.NumCPF = ko.isObservable(params.NumCPF) ? params.NumCPF : ko.observable(params.NumCPF || undefined);
        self.NumCNS = ko.isObservable(params.NumCNS) ? params.NumCNS : ko.observable(params.NumCNS || undefined);
        self.CodGrupoEspecialidade = ko.isObservable(params.CodGrupoEspecialidade) ? params.CodGrupoEspecialidade : ko.observable(params.CodGrupoEspecialidade || undefined);
        self.CodCBOS2002 = ko.isObservable(params.CodCBOS2002) ? params.CodCBOS2002 : ko.observable(params.CodCBOS2002 || undefined);
        self.Enable = ko.isObservable(params.Enable) ? params.Enable : ko.observable(true);

        self.Buscar = true;
        self.pesquisa = function () {
            if (self.Enable())
                pesquisaProfissional(function (profissional) {
                    /////valida se houve um retorno
                    if (profissional !== undefined) {
                        self.Buscar = false;
                        self.CodProfissional(profissional.codProfissional);
                        self.NomeProfissional(profissional.nomeProfissional);
                        self.SiglaOrgao(profissional.siglaOrgao);
                        self.NumeroConselhoRegional(profissional.numeroConselhoRegional);
                        self.CodUF(profissional.CodUF);
                        self.CodProfissionalConselho(profissional.codProfissionalConselho);
                        self.CodFcesProfissionalConselho(profissional.codFcesProfissionalConselho);
                        self.NumCPF(profissional.NumCPF);
                        self.NumCNS(profissional.NumCNS);
                        self.CodGrupoEspecialidade(profissional.codGrupoEspecialidade);
                        self.CodCBOS2002(profissional.codCBOS2002);

                        self.Buscar = true;
                    }
                }, params.idQuery, null);
        }

        self.NumeroConselhoRegional.subscribe(function (NumeroConselhoRegional) {
            if (!IsNullOrWhiteSpace(NumeroConselhoRegional) && self.Buscar) {
                pesquisaProfissionalNumConselho(function (profissional) {
                    /////valida se houve um retorno
                    if (profissional !== undefined) {
                        self.Buscar = false;
                        self.CodProfissional(profissional.CodProfissional);
                        self.NomeProfissional(profissional.NomeProfissional);
                        self.SiglaOrgao(profissional.SiglaOrgao);
                        self.NumeroConselhoRegional(profissional.NumeroConselhoRegional);
                        self.CodUF(profissional.CodUF);
                        self.CodProfissionalConselho(profissional.CodProfissionalConselho);
                        self.CodFcesProfissionalConselho(profissional.CodFcesProfissionalConselho);
                        self.NumCPF(profissional.NumCPF);
                        self.NumCNS(profissional.NumCNS);
                        self.CodGrupoEspecialidade(profissional.CodGrupoEspecialidade);
                        self.CodCBOS2002(profissional.CodCBOS2002);
                        self.Buscar = true;
                    } else {
                        self.Buscar = false;
                        self.CodProfissional('');
                        self.NomeProfissional('');
                        self.SiglaOrgao('');
                        self.NumeroConselhoRegional('');
                        self.CodUF('');
                        self.CodProfissionalConselho('');
                        self.CodFcesProfissionalConselho('');
                        self.NumCPF('');
                        self.NumCNS('');
                        self.CodGrupoEspecialidade('');
                        self.CodCBOS2002('');
                        self.Buscar = true;
                    }
                }, NumeroConselhoRegional, params.idQuery, null);
            } else if (IsNullOrWhiteSpace(NumeroConselhoRegional)) {
                self.Buscar = false;
                self.CodProfissional('');
                self.NomeProfissional('');
                self.SiglaOrgao('');
                self.NumeroConselhoRegional('');
                self.CodUF('');
                self.CodProfissionalConselho('');
                self.CodFcesProfissionalConselho('');
                self.NumCPF('');
                self.NumCNS('');
                self.CodGrupoEspecialidade('');
                self.CodCBOS2002('');
                self.Buscar = true;
            }
        });
    },
    template:
        '<fieldset class="field-border" style="width: 99%;">\
             <legend data-bind="text: NomeLegendaProfissional"></legend>\
             <!-- Nº Conselho -->\
             <div class="form-fieldset -search-full " style="width: 12%;">\
                 <label class="form-label">Nº Conselho</label>\
                 <input data-bind="value: NumeroConselhoRegional, enable: Enable" type="text" class="form-input" />\
                 <a title="buscar" data-bind="click: pesquisa, attr: { \'disabled\': Enable() ? false : \'disabled\' }" class="form-input-btn focus" href="#">buscar</a>\
             </div>\
             <!-- /Nº Conselho -->\
             <!-- Nome do Profissional -->\
             <div class="form-fieldset -no-margin -search-full" style="width: 86%;">\
                 <label class="form-label">Nome Profissional</label>\
                 <input data-bind="value: NomeProfissional, enable: Enable" data-disabled="true" disabled="disabled" type="text" class="form-input" />\
             </div>\
             <!-- /Nome do Profissional -->\
         </fieldset>'
});

/// pesquisa de cid
ko.components.register('pesquisa-cid', {
    viewModel: function (params) {
        var self = this;
        self.CodCid = params.CodCid;
        self.DscCid = params.DscCid;
        self.Enable = ko.isObservable(params.Enable) ? params.Enable : ko.observable(true);
        self.Buscar = true;
        self.CodUsuario = ko.isObservable(params.CodUsuario) ? params.CodUsuario : ko.observable(0);
        //Para não precisar passar o codigo do usuário quando tiver o painel
        if (self.CodUsuario() == 0 || self.CodUsuario() == undefined) {
            var codusuario = $('#PainelUsuario_CodUsuario').val();
            if (codusuario != 0 && codusuario != undefined && codusuario != '')
                self.CodUsuario(codusuario);
        }
        self.pesquisa = function () {
            if (self.Enable())
                pesquisaCID(function (cidSelecionado) {
                    /////valida se houve um retorno
                    if (cidSelecionado !== undefined) {
                        self.Buscar = false;
                        self.CodCid(cidSelecionado.codCID.toUpperCase());
                        self.DscCid(cidSelecionado.dscCategoria + ' / ' + cidSelecionado.dscCIDSubcategoria);
                        self.Buscar = true;
                    }
                }), self.CodUsuario();
        }

        self.CodCid.subscribe(function (codCid) {
            if (!IsNullOrWhiteSpace(codCid) && self.Buscar) {
                if (self.CodUsuario() == 0 || self.CodUsuario() == undefined) {
                    var codusuario = $('#PainelUsuario_CodUsuario').val();
                    if (codusuario != 0 && codusuario != undefined && codusuario != '')
                        self.CodUsuario(codusuario);
                }
                ajax(getGlobalUrl("/CompartilhadoCid/BuscaCid"), { codCid: codCid.toUpperCase(), codUsuario: self.CodUsuario() }, function (cid) {
                    if (!IsNullOrWhiteSpace(cid.codCID)) {
                        if (self.CodUsuario() != undefined && self.CodUsuario() != 0 && self.CodUsuario() != '') {
                            if (cid.CidValido == true) {
                                self.Buscar = false;
                                self.CodCid(codCid.toUpperCase());
                                self.DscCid(cid.dscCategoria + ' / ' + cid.dscCIDSubcategoria);
                                self.Buscar = true;
                            } else {
                                warningMessage('O CID10 informado é incompatível com o sexo do usuário.', 'Aviso!', function () {
                                    self.Buscar = false;
                                    self.CodCid('');
                                    self.DscCid('');
                                    self.Buscar = true;
                                });
                            }
                        } else {
                            self.Buscar = false;
                            self.CodCid(codCid.toUpperCase());
                            self.DscCid(cid.dscCategoria + ' / ' + cid.dscCIDSubcategoria);
                            self.Buscar = true;
                        }
                    } else
                        warningMessage("Código CID inválido.", "Atenção!", function (ok) {
                            self.CodCid('');
                            self.DscCid('');
                        });
                });
            } else if (IsNullOrWhiteSpace(codCid)) {
                self.Buscar = false;
                self.CodCid('');
                self.DscCid('');
                self.Buscar = true;
            }
        });

        globalEvents($('.pesquisa-cid'));
    },
    template:
        '<div class="form-fieldset -search-full pesquisa-cid" style="width:10%;">\
            <label class="form-label">CID10</label>\
            <input type="text" data-bind="value: CodCid, enable: Enable" class="form-input" maxlength="4" />\
            <a title="buscar" data-bind="click: pesquisa, attr: { \'disabled\': Enable() ? false : \'disabled\' }" class="form-input-btn focus" href="#">buscar</a>\
        </div>\
        <div class="form-fieldset -no-margin pesquisa-cid" style="width:88.5%;">\
            <label class="form-label">Categoria/SubCategoria</label>\
            <input type="text" data-bind="value: DscCid" data-disabled="true" disabled="disabled" class="form-input" />\
        </div>'
});

/// pesquisa de cid
ko.components.register('pesquisa-cid-notificacao', {
    viewModel: function (params) {
        var self = this;
        self.CodCid = params.CodCid;
        self.DscCid = params.DscCid;
        self.CodUsuario = params.CodUsuario;
        self.DatPrimeirosSintomas = params.DatPrimeirosSintomas;
        self.IndNotificacao = params.IndNotificacao;
        self.IndImprimeNotificacao = params.IndImprimeNotificacao;
        self.MensagemNotificacao = ko.observable();
        self.Enable = ko.isObservable(params.Enable) ? params.Enable : ko.observable(true);
        self.Buscar = true;


        if (params.listaSugestaoCiap2 !== undefined)
            self.listaSugestaoCiap2 = params.listaSugestaoCiap2;
        else
            self.listaSugestaoCiap2 = ko.observable([]);

        if (params.listaSugestaoCiap2Subjetivo !== undefined)
            self.listaSugestaoCiap2Subjetivo = params.listaSugestaoCiap2Subjetivo;
        else
            self.listaSugestaoCiap2Subjetivo = ko.observable([]);

        if (params.listaSugestaoCiap2Plano !== undefined)
            self.listaSugestaoCiap2Plano = params.listaSugestaoCiap2Plano;
        else
            self.listaSugestaoCiap2Plano = ko.observable([]);


        //Para não precisar passar o codigo do usuário quando tiver o painel
        if (self.CodUsuario() == 0 || self.CodUsuario() == undefined) {
            var codusuario = $('#PainelUsuario_CodUsuario').val();
            if (codusuario != 0 && codusuario != undefined && codusuario != '')
                self.CodUsuario(codusuario);
        }

        self.pesquisa = function () {
            if (IsNullOrWhiteSpace(self.CodUsuario()) || self.CodUsuario() == 0) {
                warningMessage('É necessário haver um usuário para realizar este tipo de pesquisa!');
                return;
            }
            if (self.Enable()) {

                self.ListaTodasSugestoesCiap2 = ko.observable(self.listaSugestaoCiap2());

                if (!IsNullOrWhiteSpace(self.listaSugestaoCiap2Subjetivo()))
                    if (IsNullOrWhiteSpace(self.ListaTodasSugestoesCiap2()))
                        self.ListaTodasSugestoesCiap2(self.listaSugestaoCiap2Subjetivo());
                    else
                        self.ListaTodasSugestoesCiap2(self.ListaTodasSugestoesCiap2() + "," + self.listaSugestaoCiap2Subjetivo());

                if (!IsNullOrWhiteSpace(self.listaSugestaoCiap2Plano()))
                    if (IsNullOrWhiteSpace(self.ListaTodasSugestoesCiap2()))
                        self.ListaTodasSugestoesCiap2(self.listaSugestaoCiap2Plano());
                    else
                        self.ListaTodasSugestoesCiap2(self.ListaTodasSugestoesCiap2() + "," + self.listaSugestaoCiap2Plano());

                pesquisaCID(function (cidSelecionado) {

                    if (cidSelecionado !== undefined) {
                        self.Buscar = false;
                        self.CodCid(cidSelecionado.codCID);
                        self.DscCid(cidSelecionado.dscCategoria + ' / ' + cidSelecionado.dscCIDSubcategoria);
                        if (cidSelecionado.CidValido == 'True') {
                            ajax(getGlobalUrl("/CompartilhadoCid/BuscaNotificacaoCid"), { codUsuario: self.CodUsuario(), codCid: self.CodCid().toUpperCase() }, function (data) {
                                if (data.Sucesso) {
                                    warningMessage(data.Mensagem);
                                    if (data.Codigo > 0) {
                                        self.IndImprimeNotificacao(true);
                                        self.IndNotificacao(true);
                                    } else {
                                        self.IndImprimeNotificacao(false);
                                        self.IndNotificacao(false);
                                    }
                                } else {
                                    self.IndImprimeNotificacao(false);
                                    self.IndNotificacao(false);
                                }
                                self.Buscar = true;
                            });
                        } else {
                            self.Buscar = true;
                        }
                    }
                }, self.CodUsuario(), self.ListaTodasSugestoesCiap2());
            }
        }

        self.CodCid.subscribe(function (codCid) {
            if (!IsNullOrWhiteSpace(codCid) && self.Buscar) {
                if (IsNullOrWhiteSpace(self.CodUsuario()) || self.CodUsuario() == 0) {
                    warningMessage('É necessário haver um usuário para realizar este tipo de pesquisa!');
                    return;
                };
                ajax(getGlobalUrl("/CompartilhadoCid/BuscaCidComNotificacao"), { codCid: codCid.toUpperCase(), codUsuario: self.CodUsuario() }, function (cid) {
                    if (!IsNullOrWhiteSpace(cid.codCID)) {
                        if (cid.CidValido == true) {
                            self.Buscar = false;
                            self.CodCid(codCid.toUpperCase());
                            self.DscCid(cid.dscCategoria + ' / ' + cid.dscCIDSubcategoria);
                            self.IndNotificacao(cid.IndNotificacao);
                            self.MensagemNotificacao(cid.MensagemNotificacao);
                            self.IndImprimeNotificacao(cid.IndImprimeNotificacao);

                            if (!IsNullOrWhiteSpace(self.MensagemNotificacao())) {
                                warningMessage(self.MensagemNotificacao());
                            }

                            self.Buscar = true;
                        }
                        else {
                            warningMessage("O CID10 informado é incompatível com o sexo do usuário.", "Aviso!", function () {
                                self.CodCid('');
                                self.DscCid('');
                                self.IndImprimeNotificacao(false);
                                self.IndNotificacao(false);
                            });
                        }
                    } else
                        warningMessage("Código CID inválido.", "Atenção!", function (ok) {
                            self.CodCid('');
                            self.DscCid('');
                            self.IndImprimeNotificacao(false);
                            self.IndNotificacao(false);
                        });
                });
            } else if (IsNullOrWhiteSpace(codCid)) {
                self.Buscar = false;
                self.CodCid('');
                self.DscCid('');
                self.Buscar = true;
            }
        });

        self.DatPrimeirosSintomas.subscribe(function (data) {
            if (!IsNullOrWhiteSpace(data)) {
                var data = moment(data).format("DD/MM/YYYY");

                Frame_ComparaDataAtual(data, function (retorno) {
                    if (retorno > 0) {
                        warningMessage('A data de primeiros sintomas não pode ser superior a data atual', 'Atenção!', function (ok) { self.DatPrimeirosSintomas(''); });
                    }
                });
            }
        });
    },
    template:
        '<div class="form-fieldset -search-full pesquisa-cid" style="width:9%;">\
            <label class="form-label">CID10</label>\
            <input type="text" data-bind="upper: CodCid, enable: Enable" class="form-input" maxlength="4" />\
            <a title="buscar" data-bind="click: pesquisa, attr: { \'disabled\': Enable() ? false : \'disabled\' }" class="form-input-btn focus" href="#">buscar</a>\
        </div>\
        <div class="form-fieldset pesquisa-cid" style="width:62%;">\
            <label class="form-label">Categoria/SubCategoria</label>\
            <input type="text" data-bind="value: DscCid" data-disabled="true" disabled="disabled" class="form-input" />\
        </div>\
        <div class="form-fieldset -no-margin" style="width:26%;">\
            <label class="form-label">Data dos Primeiros Sintomas</label>\
            <input type="text" data-bind="enable: Enable, datepicker: DatPrimeirosSintomas" class="form-input" maxlength="10">\
        </div>'
});

/// componente para autocompletar
ko.components.register('autocompletar', {
    viewModel: function (params) {
        var self = this;
        self.source = params.pesquisa;
        self.value = params.valor;
        self.inputProp = params.descricao;
        self.delay = params.delay == undefined ? 1000 : params.delay;
        self.label = params.tipo == 1 ? self.inputProp : 'mylabel';
    },
    template:
        '<div class="form-fieldset" style="width:100%">\
            <input class="form-input" data-bind="jqAuto: { source: source, value: value, inputProp: inputProp, labelProp: label, options: { delay: delay } }" />\
        </div>'
});

/// toolbar
var Toolbar = function (model) {
    /// <summary>
    /// configurações da toolbar
    /// </summary>
    /// <param name="model" type="type"></param>

    var toolbarModel = this;

    if (typeof model.Salvar == "function") {
        toolbarModel.Salvar = function () { if (toolbarModel.BotaoSalvar()) { model.Salvar(); } };
        toolbarModel.BotaoSalvar = ko.observable(true);
        toolbarModel.DesabilitaSalvar = function () { toolbarModel.BotaoSalvar(false); }
        toolbarModel.HabilitaSalvar = function () { toolbarModel.BotaoSalvar(true); }
    }

    if (typeof model.Sair == "function") {
        toolbarModel.Sair = function () { if (toolbarModel.BotaoSair()) { model.Sair(); } };
        toolbarModel.BotaoSair = ko.observable(true);
        toolbarModel.DesabilitaSair = function () { toolbarModel.BotaoSair(false); }
        toolbarModel.HabilitaSair = function () { toolbarModel.BotaoSair(true); }
    }

    if (typeof model.Inserir == "function") {
        toolbarModel.Inserir = function () { if (toolbarModel.BotaoInserir()) { model.Inserir(); } };
        toolbarModel.BotaoInserir = ko.observable(true);
        toolbarModel.DesabilitaInserir = function () { toolbarModel.BotaoInserir(false); }
        toolbarModel.HabilitaInserir = function () { toolbarModel.BotaoInserir(true); }
    }

    if (typeof model.Editar == "function") {
        toolbarModel.Editar = function () { if (toolbarModel.BotaoEditar()) { model.Editar(); } };
        toolbarModel.BotaoEditar = ko.observable(true);
        toolbarModel.DesabilitaEditar = function () { toolbarModel.BotaoEditar(false); }
        toolbarModel.HabilitaEditar = function () { toolbarModel.BotaoEditar(true); }
    }

    if (typeof model.Selecionar == "function") {
        toolbarModel.Selecionar = function () { if (toolbarModel.BotaoSelecionar()) { model.Selecionar(); } };
        toolbarModel.BotaoSelecionar = ko.observable(true);
        toolbarModel.DesabilitaSelecionar = function () { toolbarModel.BotaoSelecionar(false); }
        toolbarModel.HabilitaSelecionar = function () { toolbarModel.BotaoSelecionar(true); }
    }

    if (typeof model.Pesquisar == "function") {
        toolbarModel.Pesquisar = function () { if (toolbarModel.BotaoPesquisar()) { model.Pesquisar(); } };
        toolbarModel.BotaoPesquisar = ko.observable(true);
        toolbarModel.DesabilitaPesquisar = function () { toolbarModel.BotaoPesquisar(false); }
        toolbarModel.HabilitaPesquisar = function () { toolbarModel.BotaoPesquisar(true); }
    }

    if (typeof model.Excluir == "function") {
        toolbarModel.Excluir = function () { if (toolbarModel.BotaoExcluir()) { model.Excluir(); } };
        toolbarModel.BotaoExcluir = ko.observable(true);
        toolbarModel.DesabilitaExcluir = function () { toolbarModel.BotaoExcluir(false); }
        toolbarModel.HabilitaExcluir = function () { toolbarModel.BotaoExcluir(true); }
    }

    if (typeof model.Atualizar == "function") {
        toolbarModel.Atualizar = function () { if (toolbarModel.BotaoAtualizar()) { model.Atualizar(); } };
        toolbarModel.BotaoAtualizar = ko.observable(true);
        toolbarModel.DesabilitaAtualizar = function () { toolbarModel.BotaoAtualizar(false); }
        toolbarModel.HabilitaAtualizar = function () { toolbarModel.BotaoAtualizar(true); }
    }

    if (typeof model.Imprimir == "function") {
        toolbarModel.Imprimir = function () { if (toolbarModel.BotaoImprimir()) { model.Imprimir(); } };
        toolbarModel.BotaoImprimir = ko.observable(true);
        toolbarModel.DesabilitaImprimir = function () { toolbarModel.BotaoImprimir(false); }
        toolbarModel.HabilitaImprimir = function () { toolbarModel.BotaoImprimir(true); }
    }

    if (typeof model.Limpar == "function") {
        toolbarModel.Limpar = function () { if (toolbarModel.BotaoLimpar()) { model.Limpar(); } };
        toolbarModel.BotaoLimpar = ko.observable(true);
        toolbarModel.DesabilitaLimpar = function () { toolbarModel.BotaoLimpar(false); }
        toolbarModel.HabilitaLimpar = function () { toolbarModel.BotaoLimpar(true); }
    }

    if (typeof model.Cancelar == "function") {
        toolbarModel.Cancelar = function () { if (toolbarModel.BotaoCancelar()) { model.Cancelar(); } };
        toolbarModel.BotaoCancelar = ko.observable(true);
        toolbarModel.DesabilitaCancelar = function () { toolbarModel.BotaoCancelar(false); }
        toolbarModel.HabilitaCancelar = function () { toolbarModel.BotaoCancelar(true); }
    }

    /// tratamentos de erro
    toolbarModel.Erros = ko.observableArray();
    toolbarModel.Modal = ko.observable(false);
    toolbarModel.IsValidando = ko.observable(false);

    toolbarModel.VisualizarModal = function () {
        toolbarModel.Modal(true);
    }

    model.errors.subscribe(function (data) {
        if (toolbarModel.IsValidando()) {
            toolbarModel.Erros(model.errors());
            if (model.errors.length == 0) {
                toolbarModel.Modal(false);
            }
        }
    });

    toolbarModel.EsconderModal = function () { toolbarModel.Modal(false); }

    toolbarModel.MostraErros = function () {
        errorMessage(model.errors(), "Atenção!");
        toolbarModel.Erros(model.errors());
        model.errors.showAllMessages(true);
        toolbarModel.IsValidando(true);
    };

    return toolbarModel;
};

var BotaoToobar = function (action) {
    var botao = this;
    botao.Visivel = ko.observable(typeof action == "function");
    botao.Click = function () { if (botao.Habilitado() && botao.Visivel()) { action(); } };
    botao.Habilitado = ko.observable(true);
};

/// toolbar
var ToolbarFast = function (model) {
    /// <summary>
    /// configurações da toolbar
    /// </summary>
    /// <param name="model" type="type"></param>

    var toolbarModel = this;

    toolbarModel.BtnSalvar = new BotaoToobar(model.Salvar);
    toolbarModel.BtnSair = new BotaoToobar(model.Sair);
    toolbarModel.BtnInserir = new BotaoToobar(model.Inserir);
    toolbarModel.BtnEditar = new BotaoToobar(model.Editar);
    toolbarModel.BtnSelecionar = new BotaoToobar(model.Selecionar);
    toolbarModel.BtnPesquisar = new BotaoToobar(model.Pesquisar);
    toolbarModel.BtnExcluir = new BotaoToobar(model.Excluir);
    toolbarModel.BtnAtualizar = new BotaoToobar(model.Atualizar);
    toolbarModel.BtnImprimir = new BotaoToobar(model.Imprimir);
    toolbarModel.BtnLimpar = new BotaoToobar(model.Limpar);
    toolbarModel.BtnCancelar = new BotaoToobar(model.Cancelar);
    toolbarModel.BtnCarregar = new BotaoToobar(model.Carregar);


    ajax(getGlobalUrl("/Login/Licenciado"), {}, function (licenciado) {

        if (toolbarModel.BtnSalvar.Visivel())
            toolbarModel.BtnSalvar.Visivel(licenciado)
        if (toolbarModel.BtnExcluir.Visivel())
            toolbarModel.BtnExcluir.Visivel(licenciado)
        if (toolbarModel.BtnAtualizar.Visivel())
            toolbarModel.BtnAtualizar.Visivel(licenciado)
        if (toolbarModel.BtnCancelar.Visivel())
            toolbarModel.BtnCancelar.Visivel(licenciado)
    });

    /// tratamentos de erro
    toolbarModel.Erros = ko.observableArray();
    toolbarModel.Modal = ko.observable(false);
    toolbarModel.IsValidando = ko.observable(false);

    toolbarModel.VisualizarModal = function () {
        toolbarModel.Modal(true);
    }

    model.errors = ko.validation.group(model);

    model.errors.subscribe(function (data) {
        if (toolbarModel.IsValidando()) {
            toolbarModel.Erros(model.errors());
            if (model.errors.length == 0) {
                toolbarModel.Modal(false);
            }
        }
    });

    toolbarModel.EsconderModal = function () { toolbarModel.Modal(false); }

    toolbarModel.MostraErros = function () {
        errorMessage(model.errors(), "Atenção!");
        toolbarModel.Erros(model.errors());
        model.errors.showAllMessages(true);
        toolbarModel.IsValidando(true);
    };

    return toolbarModel;
};

ko.components.register('fast-toolbar', {
    viewModel: function (params) {
        params.model.Toolbar = new ToolbarFast(params.model);
    },
    template:
        '<div data-bind="with:$parent.Toolbar">\
    <div id=ToolbarRelatorio class="toolbar-box" >\
    <ul class="toolbar-list">\
        <li class="toolbar-li"><a title="Inserir" data-bind="click: BtnInserir.Click, visible: BtnInserir.Visivel, attr: { \'data-disabled\': !BtnInserir.Habilitado() }, css: { \'-disabled\' : !BtnInserir.Habilitado() } "><i class=\"fas fa-plus-circle fa-lg\"></i> </a></li>\
        <li class="toolbar-li"><a title="Editar" data-bind="click: BtnEditar.Click, visible: BtnEditar.Visivel, attr: { \'data-disabled\': !BtnEditar.Habilitado() }, css: { \'-disabled\' : !BtnEditar.Habilitado() } "><i class=\"fas fa-edit fa-lg\"></i> </a></li>\
        <li class="toolbar-li"><a title="Selecionar" data-bind="click: BtnSelecionar.Click, visible: BtnSelecionar.Visivel, attr: { \'data-disabled\': !BtnSelecionar.Habilitado() }, css: { \'-disabled\' : !BtnSelecionar.Habilitado() } "><i class=\"fas fa-check-circle fa-lg\"></i> </a></li>\
        <li class="toolbar-li"><a title="Pesquisar" data-bind="click: BtnPesquisar.Click, visible: BtnPesquisar.Visivel, attr: { \'data-disabled\': !BtnPesquisar.Habilitado() }, css: { \'-disabled\' : !BtnPesquisar.Habilitado() } "><i class="fas fa-search fa-lg"></i></a></li>\
        <li class="toolbar-li"><a title="Salvar" data-bind="click: BtnSalvar.Click, visible: BtnSalvar.Visivel, attr: { \'data-disabled\': !BtnSalvar.Habilitado() }, css: { \'-disabled\' : !BtnSalvar.Habilitado() } "><i class="fas fa-save fa-lg"></i> </a></li>\
        <li class="toolbar-li"><a title="Excluir" data-bind="click: BtnExcluir.Click, visible: BtnExcluir.Visivel, attr: { \'data-disabled\': !BtnExcluir.Habilitado() }, css: { \'-disabled\' : !BtnExcluir.Habilitado() } "><i class="fas fa-trash-alt fa-lg"></i> </a></li>\
        <li class="toolbar-li"><a title="Atualizar" data-bind="click: BtnAtualizar.Click, visible: BtnAtualizar.Visivel, attr: { \'data-disabled\': !BtnAtualizar.Habilitado() }, css: { \'-disabled\' : !BtnAtualizar.Habilitado() } " ><i class="fas fa-sync-alt fa-lg"></i> </a></li>\
        <li class="toolbar-li"><a title="Imprimir" data-bind="click: BtnImprimir.Click, visible: BtnImprimir.Visivel, attr: { \'data-disabled\': !BtnImprimir.Habilitado() }, css: { \'-disabled\' : !BtnImprimir.Habilitado() }" ><i class="fas fa-print fa-lg"></i> </a></li>\
        <li class="toolbar-li"><a title="Limpar" data-bind="click: BtnLimpar.Click, visible: BtnLimpar.Visivel, attr: { \'data-disabled\': !BtnLimpar.Habilitado() }, css: { \'-disabled\' : !BtnLimpar.Habilitado() } "><i class=\"fas fa-eraser fa-lg\"></i> </a></li>\
        <li class="toolbar-li"><a title="Cancelar" data-bind="click: BtnCancelar.Click, visible: BtnCancelar.Visivel, attr: { \'data-disabled\': !BtnCancelar.Habilitado() }, css: { \'-disabled\' : !BtnCancelar.Habilitado() } "><i class="fas fa-undo-alt fa-lg"></i> </a></li>\
        <li class="toolbar-li"><a title="Carregar" data-bind="click: BtnCarregar.Click, visible: BtnCarregar.Visivel, attr: { \'data-disabled\': !BtnCarregar.Habilitado() }, css: { \'-disabled\' : !BtnCarregar.Habilitado() } "><i class=\"fas fa-file-upload fa-lg\"></i> </a> </li>\
        <li class="toolbar-li close"><a title="Sair" data-bind="click: BtnSair.Click, visible: BtnSair.Visivel, attr: { \'data-disabled\': !BtnSair.Habilitado() }, css: { \'-disabled\' : !BtnSair.Habilitado() }" ><i class="fas fa-sign-out fa-lg"></i> </a> </li>\
        <li class="toolbar-li li-erro" id="mostrarBotaoChamaModalErros" style="float: right; display:none;"><a title="Avisos"><i class=\"far fa-exclamation-circle fa-lg\"></i> </a>Avisos</li>\
        <li class="toolbar-li li-erro" data-bind="visible: Erros().length > 0, click: VisualizarModal " style="float: right; display:none;"><a title="Avisos"> <i class=\"far fa-exclamation-circle fa-lg\"></i></a></li>\
    </ul>\
    <div class="lightbox" data-bind="visible: Modal, style: { display: Modal() ? \'block\' : \'none\' }" style="display: none;">\
        <div class="light-bg"></div>");\
                <div class="light-content-box -form">\
            <div class="light-content modal-content">\
                <div class="modal-header erro">\
                    <div class="bootstrap-dialog-header">\
                        <div class="bootstrap-dialog-title"><i class="fas fa-exclamation-triangle"></i>Aviso!</div>");\
                            </div>\
                </div>\
                <div class="modal-body">\
                    <div class="bootstrap-dialog-body">\
                        <div class="bootstrap-dialog-message">\
                            <ul class="ko-errors" data-bind="foreach: Erros">\
                                <li class="required">* <span data-bind="text: $data">* </span></li>\
                            </ul>\
                        </div>\
                    </div>\
                </div>\
                <div class="modal-footer">\
                    <div class="bootstrap-dialog-footer">\
                        <div class="bootstrap-dialog-footer-buttons">\
                            <div class="btn-box"><a data-bind="click: EsconderModal" href="#" class="btn btn-ok">OK</a></div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
        </div>\
    </div>'
});


/// template relatórios dinâmicos
ko.components.register('parametro-relatorio', {
    viewModel: function (params) {
        var self = this;
        self.Parametros = params.parametros;
        self.AbaAtiva = params.parametros.AbaAtiva;
        self.CodFcesSelecionado = params.parametros.CodFcesSelecionado;
        self.CodSegmentoSelecionado = params.parametros.CodSegmentoSelecionado;
        self.DatInicial = params.parametros.DatInicial;
        self.DatFinal = params.parametros.DatFinal;

        self.abaClick = function (model, event) {
            self.AbaAtiva(event.currentTarget.dataset.id);
            return true;
        };

        self.abaKeydown = function (model, event) {
            if (event.keyCode === 13)
                self.AbaAtiva(event.currentTarget.dataset.id);
            return true;
        };
    },
    template:
        '<div data-bind="with:Parametros">\
            <div class="row">\
                <fieldset class="field-border" style="width:700px;">\
                    <div id="DinRelatorio_tabs" style="width: 99%;">\
                        <ul class="ulTabsKO" id="DinRelatorio_TabPrincipal">\
                            <li class="tab secretaria" data-id="Aba-Sms" data-bind="click: $parent.abaClick, event: { keydown: $parent.abaKeydown }, css: { active: $parent.AbaAtiva() == \'Aba-Sms\' }, visible:IndShowSecretaria"><a>Secretaria Municipal de Saúde</a></li>\
                            <li class="tab segmento" data-id="Aba-Segmento" data-bind="click: $parent.abaClick, event: { keydown: $parent.abaKeydown }, css: { active: $parent.AbaAtiva() == \'Aba-Segmento\' }, visible:IndShowSegmento"><a>Segmento Município</a></li>\
                            <li class="tab estabelecimento" data-id="Aba-Fces" data-bind="click: $parent.abaClick, event: { keydown: $parent.abaKeydown }, css: { active: $parent.AbaAtiva() == \'Aba-Fces\' }, visible:IndShowEstabelecimento"><a>Estabelecimento</a></li>\
                        </ul>\
                        <div id="DinRelatorio_TabPrincipalContentTabs" class="contentTabs">\
                            <div data-bind="visible: $parent.AbaAtiva() == \'Aba-Sms\'">\
                                <div class="row">\
                                    <p class="title4 textAlignCenter" style="margin-top: 15px;" data-bind="text: NomFcesLogado"></p>\
                                </div>\
                            </div>\
                            <div data-bind="visible: $parent.AbaAtiva() == \'Aba-Segmento\'">\
                                <div class="row">\
                                    <div class="form-fieldset" style="width: 99%;">\
                                        <select class="combo form-input" data-bind="options: ListaSegmentos, optionsValue: \'Codigo\', optionsText: \'Descricao\', value: $parent.CodSegmentoSelecionado" style="text-align: left;margin-top: 15px;"></select>\
                                    </div>\
                                </div>\
                            </div>\
                            <div data-bind="visible: $parent.AbaAtiva() == \'Aba-Fces\'">\
                                <div class="row">\
                                    <div class="form-fieldset" style="width: 99%;">\
                                        <select class="combo form-input" data-bind="options: ListaEstabelecimentos, optionsValue: \'Codigo\', optionsText: \'Descricao\', value: $parent.CodFcesSelecionado, enable: IndPermiteSelecionarEstabelecimento()" style="text-align: left;margin-top: 15px;"></select>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </fieldset>\
            </div>\
            <div data-bind="visible:IndShowPeriodo">\
                <div class="row">\
                    <fieldset class="field-border" style="width:700px;">\
                        <legend>Período</legend>\
                        <div class="row">\
                            <div class="form-fieldset" style="width: 20%;">\
                                <label class="form-label">Data Inicial</label>\
                                <input type="text" class="form-input datepicker" data-bind="datepicker: $parent.DatInicial" />\
                            </div>\
                            <div class="form-fieldset" style="width: 20%;">\
                                <label class="form-label">Data Final</label>\
                                <input type="text" class="form-input datepicker" data-bind="datepicker: $parent.DatFinal" />\
                            </div>\
                        </div>\
                    </fieldset>\
                </div>\
            </div>\
         </div>'
});