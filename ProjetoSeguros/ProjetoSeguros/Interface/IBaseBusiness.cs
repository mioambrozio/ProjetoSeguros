using ProjetoSeguros.Models;

namespace ProjetoSeguros.Interface
{
    interface IBaseBusiness
    {
        /// <summary>
        /// Salvar seguro
        /// </summary>
        /// <param name="numCliente">Numero do cliente</param>
        /// <param name="indTipo">tipo do seguro automovel, residencial, vida</param>
        /// <param name="objetoSegurado">identificador do objeto do segurado</param>
        /// <param name="idSeguro">id do seguro</param>
        /// <returns></returns>
        Retorno Salvar(string numCliente, int indTipo, string objetoSegurado, int? idSeguro = null);

        /// <summary>
        /// Excluir Seguro
        /// </summary>
        /// <param name="numSeguro">Número do seguro</param>
        /// <returns></returns>
        Retorno Excluir(int numSeguro);

        /// <summary>
        /// Buscar Seguro
        /// </summary>
        /// <param name="numSeguro">Número do seguro</param>
        /// <returns></returns>
        Retorno Buscar(int numSeguro);

        /// <summary>
        /// listar todos o seguros
        /// </summary>
        /// <returns></returns>
        Retorno Pesquisar();

        /// <summary>
        /// Pesquisar seguro por numero da placa
        /// </summary>
        /// <param name="numPlaca">Número da placa do automovel</param>
        /// <returns></returns>
        Retorno Pesquisar(string numPlaca);
    }
}