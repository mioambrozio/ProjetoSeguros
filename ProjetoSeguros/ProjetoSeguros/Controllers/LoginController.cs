using ProjetoSeguros.Business;
using System.Web.Mvc;

namespace ProjetoSeguros.Controllers
{
    public class LoginController : Controller
    {
        LoginBusiness bl = new LoginBusiness();
        public ActionResult Login()
        {
            return View(new Models.Login());
        }

        public JsonResult Entrar(string usuario, string senha)
        {
            return Json(bl.Entrar(usuario, senha));
        }

        public ActionResult Sair()
        {
            bl.Sair();
            return View("Login", new Models.Login());
        }
    }
}