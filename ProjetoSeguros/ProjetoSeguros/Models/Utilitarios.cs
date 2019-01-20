using System;

namespace ProjetoSeguros.Models
{
    public static class Utilitarios
    {
        public static void PopularListaInicial()
        {
            DadosLogado login = RetornaDadosLogin();

            if (login.listaSeguros.Count == 0)
            {
                login.idCount = 1;
                login.listaSeguros.Add(new Seguro(false) { id = login.idCount, dscTipo = "Automóvel", indTipo = 1, numCliente = "678", objetoSegurado = "ASD1234" });
                login.idCount++; login.listaSeguros.Add(new Seguro(false) { id = login.idCount, dscTipo = "Residencial", indTipo = 2, numCliente = "1234", objetoSegurado = "RUA PEDRO SENKO, 152, BOQUEIRRÃO - ARAUCÁRIA/PR" });
                login.idCount++; login.listaSeguros.Add(new Seguro(false) { id = login.idCount, dscTipo = "Vida", indTipo = 3, numCliente = "36", objetoSegurado = "07876554300" });
                login.idCount++; login.listaSeguros.Add(new Seguro(false) { id = login.idCount, dscTipo = "Automóvel", indTipo = 1, numCliente = "98", objetoSegurado = "AVG9876" });
                login.idCount++; login.listaSeguros.Add(new Seguro(false) { id = login.idCount, dscTipo = "Automóvel", indTipo = 1, numCliente = "80", objetoSegurado = "BHG1234" });
                login.idCount++; login.listaSeguros.Add(new Seguro(false) { id = login.idCount, dscTipo = "Automóvel", indTipo = 1, numCliente = "45", objetoSegurado = "AKY0909" });
                login.idCount++; login.listaSeguros.Add(new Seguro(false) { id = login.idCount, dscTipo = "Vida", indTipo = 2, numCliente = "87", objetoSegurado = "RUA MINAS GERAIS, 405, COSTEIRA - ARAUCÁRIA/PR" });
            }
        }

        public static DadosLogado RetornaDadosLogin()
        {
            DadosLogado login;
            login = (DadosLogado)System.Web.HttpContext.Current.Session["sessionLogin"];
            return login;
        }
    }

    public class Retorno
    {
        public bool Sucesso { get; set; }
        public Object Resultado { get; set; }
        public string Mensagem { get; set; }

        public Retorno() { }

        public Retorno(bool sucesso)
        {
            this.Sucesso = sucesso;
        }

        public Retorno(bool sucesso, string mensagem)
        {
            this.Sucesso = sucesso;
            this.Mensagem = mensagem;
        }

        public Retorno(bool sucesso, Object resultado)
        {
            this.Sucesso = sucesso;
            this.Resultado = resultado;
        }
    }

}