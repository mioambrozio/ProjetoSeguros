using ProjetoSeguros.Models;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace ProjetoSeguros.Controllers
{
    public class HomeController : BaseController
    {
        Business.SeguroBusiness bl = new Business.SeguroBusiness();
        public ActionResult Index()
        {
            return VerificaLogado(null, null);
        }

        public ActionResult About()
        {
            return VerificaLogado("About", new Seguro(true));
        }

        public ActionResult Contact()
        {
            return VerificaLogado("Contact", new Seguro(false));
        }

        public ActionResult Pesquisar()
        {
            return VerificaLogado("Pesquisar", new BuscarSeguro() { lista = (List<Seguro>)bl.Pesquisar().Resultado });
        }

        public ActionResult EncontrarVeiculo()
        {
            return VerificaLogado("EncontrarVeiculo", new EncontrarVeiculo());
        }

        public JsonResult Filtrar(int indOpcao, string numPlaca)
        {
            if (indOpcao == 1)
                return Json(bl.Pesquisar(numPlaca));
            else
                return Json(bl.Pesquisar());
        }

        public JsonResult SalvarSeguro(string numCliente, int indTipo, string objetoSegurado, int? idSeguro = null)
        {
            return Json(bl.Salvar(numCliente, indTipo, objetoSegurado, idSeguro));
        }

        public JsonResult Buscar(int numSeguro)
        {
            return Json(bl.Buscar(numSeguro));
        }

        public JsonResult BuscarParaExcluir(int numSeguro)
        {
            return Json(bl.BuscarParaExcluir(numSeguro));
        }

        public JsonResult ConfirmaExcluir(int numSeguro)
        {
            return Json(bl.Excluir(numSeguro));
        }

        public ActionResult Excluir()
        {
            return VerificaLogado("Excluir", null);
        }

    }
}