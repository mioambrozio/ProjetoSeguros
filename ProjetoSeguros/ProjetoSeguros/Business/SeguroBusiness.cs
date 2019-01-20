using ProjetoSeguros.Interface;
using ProjetoSeguros.Models;
using System;
using System.Linq;

namespace ProjetoSeguros.Business
{
    public class SeguroBusiness : IBaseBusiness
    {
        public Retorno Salvar(string numCliente, int indTipo, string objetoSegurado, int? idSeguro = null)
        {
            Retorno retorno = new Retorno(true);
            try
            {
                string message = "";
                if (string.IsNullOrWhiteSpace(numCliente)) { message = "O campo Cliente é obrigatório.\n"; }
                else
                {
                    if(numCliente.Length == 14)
                    {
                        if(!Utilitarios.ValidaCPF(numCliente))
                            message += "O campo Cliente é inválido.\n";
                    }
                    else
                    {
                        if(!Utilitarios.ValidaCNPJ(numCliente))
                            message += "O campo Cliente é inválido.\n";
                    }
                }
                if (indTipo == 0) { message += "O campo Tipo é obrigatorio.\n"; }
                if (string.IsNullOrWhiteSpace(objetoSegurado)) { message += "O campo Objeto Segurado é obrigatório.\n"; }
                else
                {
                    if(indTipo == 3)
                    {
                        if (!Utilitarios.ValidaCPF(objetoSegurado))
                            message += "O campo Objeto Segurado é obrigatório.";
                    }
                }
                if (!string.IsNullOrWhiteSpace(message))
                {
                    retorno.Sucesso = false;
                    retorno.Mensagem = message;
                    return retorno;
                }

                if (idSeguro.HasValue && idSeguro > 0)
                {
                    foreach(Seguro s in Utilitarios.RetornaDadosLogin().listaSeguros)
                    {
                        if (s.id == idSeguro)
                        {
                            s.indTipo = indTipo;
                            s.objetoSegurado = objetoSegurado;
                            s.numCliente = numCliente;
                            s.dscTipo = indTipo == 1 ? "Automóvel" : indTipo == 2 ? "Residencial" : indTipo == 3 ? "Vida" : "";
                        }
                    }

                    retorno.Mensagem = "Alterado com sucesso!";
                }
                else
                {
                    Utilitarios.RetornaDadosLogin().idCount++;

                    Utilitarios.RetornaDadosLogin().listaSeguros.Add(new Seguro()
                    {
                        id = Utilitarios.RetornaDadosLogin().idCount,
                        indTipo = indTipo,
                        objetoSegurado = objetoSegurado,
                        numCliente = numCliente,
                        dscTipo = indTipo == 1 ? "Automóvel" : indTipo == 2 ? "Residencial" : indTipo == 3 ? "Vida" : ""
                    });
                    retorno.Mensagem = "Salvo com sucesso!";
                }
            }
            catch (Exception ex)
            {
                retorno.Sucesso = false;
                retorno.Mensagem = "Erro ao salvar. Erro:" + ex.Message;
            }
            return retorno;
        }

        public Retorno Buscar(int numSeguro)
        {
            try
            {
                if (numSeguro == 0)
                {
                    return new Retorno(false, "O campo Número do seguro é obrigatório.");
                }
                else
                {
                    Seguro s = Utilitarios.RetornaDadosLogin().listaSeguros.Where(x => x.id == numSeguro).SingleOrDefault();

                    if (s != null)
                        return new Retorno(true, s);
                    else
                        return new Retorno(false, "Seguro informado não encontrado.");
                }
            }
            catch (Exception ex)
            {
                return new Retorno(false, "Erro ao Buscar seguro. Erro: " + ex.Message);
            }
        }

        public Retorno BuscarParaExcluir(int numSeguro)
        {
            try
            {
                if (numSeguro == 0)
                    return new Retorno(false, "Informe Número do Seguro para a exclusão.");
                else
                {
                    if (Utilitarios.RetornaDadosLogin().listaSeguros.Where(x => x.id == numSeguro).ToList().Count == 0)
                        return new Retorno(false, "Seguro não encontrado!");
                    else
                        return new Retorno(true, "Deseja Realmente Excluir esse registro?");
                }
            }
            catch (Exception ex)
            {
                return new Retorno(true, "Erro ao buscar seguro. Erro: " + ex.Message);
            }
        }

        public Retorno Excluir(int numSeguro)
        {
            try
            {
                Utilitarios.RetornaDadosLogin().listaSeguros.RemoveAll((x) => x.id == numSeguro);
                return new Retorno(true, "Excluído com sucesso.");
            }
            catch (Exception ex)
            {

                return new Retorno(false, "Erro ao excluir seguro. Erro: " + ex.Message);
            }
        }

        public Retorno Pesquisar()
        {
            try
            {
                return new Retorno(true, Utilitarios.RetornaDadosLogin().listaSeguros);
            }
            catch (Exception ex)
            {
                return new Retorno(true, "Erro ao buscar seguro. Erro: " + ex.Message);
            }
        }

        public Retorno Pesquisar(string numPlaca)
        {
            Retorno retorno = new Retorno();

            try
            {
                if (string.IsNullOrWhiteSpace(numPlaca))
                {
                    retorno.Sucesso = false;
                    retorno.Mensagem = "Não encontrado seguro para este veículo.";
                }
                else
                {
                    Seguro s = Utilitarios.RetornaDadosLogin().listaSeguros.Where(x => x.objetoSegurado == numPlaca && x.indTipo == 1).SingleOrDefault();

                    if (s != null)
                    {
                        retorno.Sucesso = true;
                        retorno.Mensagem = "Seguro do veículo encontrado.";
                        EncontrarVeiculo veiculo = new EncontrarVeiculo(s);
                        retorno.Resultado = veiculo;
                    }
                    else
                    {
                        retorno.Sucesso = false;
                        retorno.Mensagem = "Seguro do veículo não encontrado.";
                    }
                }
            }
            catch (Exception ex)
            {
                retorno.Sucesso = false;

            }
            return retorno;
        }
    }
}