using ProjetoSeguros.Models;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace ProjetoSeguros.Controllers
{
    public class HomeController : Controller
    {
        Business.SeguroBusiness bl = new Business.SeguroBusiness();
        public ActionResult Index()
        {
            DadosLogado login = Utilitarios.RetornaDadosLogin();
            if (login == null)
                return RedirectToAction("Login", "Login");

            return View();
        }
        
        public ActionResult About()
        {
            return View(new Seguro(true));
        }

        public ActionResult Contact()
        {
            return View(new Seguro(false));
        }

        public ActionResult Pesquisar()
        {
            Retorno r = bl.Pesquisar();
            return View(new BuscarSeguro() { lista = (List<Seguro>)r.Resultado });
        }

        public ActionResult EncontrarVeiculo()
        {
            return View(new EncontrarVeiculo());
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
            return View();
        }

    }
}