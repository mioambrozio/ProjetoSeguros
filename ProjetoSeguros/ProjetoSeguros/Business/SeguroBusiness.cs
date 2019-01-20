using ProjetoSeguros.Interface;
using ProjetoSeguros.Models;
using System.Collections.Generic;
using System.Linq;

namespace ProjetoSeguros.Business
{
    public class SeguroBusiness : IBaseBusiness
    {
        List<Seguro> lista;

        public SeguroBusiness()
        {
            if (lista == null)
            {
                lista = new List<Seguro>();

                lista.Add(new Seguro(false) { id = 1, dscTipo = "Automóvel", indTipo = 1, numCliente = "678", objetoSegurado = "ASD-1234" });
                lista.Add(new Seguro(false) { id = 2, dscTipo = "Residencial", indTipo = 2, numCliente = "1234", objetoSegurado = "RUA PEDRO SENKO, 152, BOQUEIRRÃO - ARAUCÁRIA/PR" });
                lista.Add(new Seguro(false) { id = 3, dscTipo = "Vida", indTipo = 3, numCliente = "36", objetoSegurado = "07876554300" });
                lista.Add(new Seguro(false) { id = 4, dscTipo = "Automóvel", indTipo = 1, numCliente = "98", objetoSegurado = "AVG-9876" });
                lista.Add(new Seguro(false) { id = 5, dscTipo = "Automóvel", indTipo = 1, numCliente = "80", objetoSegurado = "BHG-1234" });
                lista.Add(new Seguro(false) { id = 6, dscTipo = "Automóvel", indTipo = 1, numCliente = "45", objetoSegurado = "AKY-0909" });
                lista.Add(new Seguro(false) { id = 7, dscTipo = "Vida", indTipo = 2, numCliente = "87", objetoSegurado = "RUA MINAS GERAIS, 405, COSTEIRA - ARAUCÁRIA/PR" });
            }
        }
        public Retorno Salvar(string numCliente, int indTipo, string objetoSegurado, int? idSeguro = null)
        {
            Retorno retorno = new Retorno();
            string message = "";
            if (string.IsNullOrWhiteSpace(numCliente)) { message = "O campo Cliente é obrigatório.<br>"; }
            if (indTipo == 0) { message += "O campo Tipo é obrigatorio.<br>"; }
            if (string.IsNullOrWhiteSpace(objetoSegurado)) { message += "O campo Objeto Segurado é obrigatório."; }

            if (idSeguro.HasValue)
            {
                //alterar
                retorno.Mensagem = "Alterado com sucesso!";
            }
            else
            {
                //salvar
                retorno.Mensagem = "Salvo com sucesso!";
            }

            return retorno;
        }

        public Retorno Buscar(int numSeguro)
        {
            if (numSeguro == 0)
            {
                return new Retorno(false, "O campo Número do seguro é obrigatório.");
            }
            else
            {
                if (numSeguro == 1234)
                    return new Retorno(true, new Seguro(true) { id = 1, indTipo = 2, numCliente = "1234", objetoSegurado = "08987688986" });

                else
                    return new Retorno(false, "Seguro informado não encontrado.");
            }
        }

        public Retorno BuscarParaExcluir(int numSeguro)
        {
            if (numSeguro == 0)
                return new Retorno(false, "Informe Número do Seguro para a exclusão.");
            else
            {
                if (lista.Where(x => x.id == numSeguro).ToList().Count == 0)
                    return new Retorno(false, "Seguro não encontrado!");
                else
                    return new Retorno(true, "Deseja Realmente Excluir esse registro?");
            }
        }

        public Retorno Excluir(int numSeguro)
        {
            lista.RemoveAll((x) => x.id == numSeguro);

            return new Retorno(true, "Excluído com sucesso.");
        }

        public Retorno Pesquisar()
        {
            return new Retorno(true, lista);
        }

        public Retorno Pesquisar(string numPlaca)
        {
            Retorno retorno = new Retorno();
            if (string.IsNullOrWhiteSpace(numPlaca))
            {
                retorno.Sucesso = false;
                retorno.Mensagem = "Não encontrado seguro para este veículo.";
            }
            else
            {
                Seguro s = lista.Where(x => x.objetoSegurado == numPlaca && x.indTipo == 1).SingleOrDefault();

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

            return retorno;
        }
    }
}