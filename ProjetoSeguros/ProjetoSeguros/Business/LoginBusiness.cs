using ProjetoSeguros.Models;
using System;
using System.Web;

namespace ProjetoSeguros.Business
{
    public class LoginBusiness
    {
        public Retorno Entrar(string usuario, string senha)
        {
            Retorno retorno = new Retorno();
            try
            {
                Login login = new Login() { senha = senha, usuario = usuario };
                HttpContext.Current.Session["sessionLogin"] = login;

                retorno.Sucesso = true;
            }
            catch (Exception ex)
            {
                retorno.Sucesso = false;
                retorno.Mensagem = "Erro ao validar os dados. Erro: " + ex.Message;
            }
            return retorno;
        }

        public Retorno Sair()
        {
            try
            {
                HttpContext.Current.Session["sessionLogin"] = null;
                HttpContext.Current.Session.Abandon();
                return new Retorno(true);
            }
            catch (Exception ex)
            {
                return new Retorno(false, "Erro ao sair. Erro: " + ex.Message);
            }
        }

    }
}