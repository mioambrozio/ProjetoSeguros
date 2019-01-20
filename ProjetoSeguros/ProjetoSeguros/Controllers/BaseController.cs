using ProjetoSeguros.Models;
using System.Web.Mvc;

namespace ProjetoSeguros.Controllers
{
    public class BaseController:Controller
    {
        public ActionResult VerificaLogado(string tela = null, object parametro = null)
        {
            DadosLogado login = Utilitarios.RetornaDadosLogin();
            if (login == null)
                return RedirectToAction("Login", "Login");

            if (!string.IsNullOrWhiteSpace(tela) && parametro == null)
            {
                return View(tela);
            }

            if (!string.IsNullOrWhiteSpace(tela) && parametro != null)
            {
                return View(tela, parametro);
            }
            return View();
        }
    }
}