using System.Collections.Generic;

namespace ProjetoSeguros.Models
{
    public class Login
    {
        public string usuario { get; set; }
        public string senha { get; set; }
    }

    public class DadosLogado : Login
    {
        public List<Seguro> listaSeguros { get; set; }
        public int idCount { get; set; }
        public DadosLogado() { this.listaSeguros = new List<Seguro>(); }
        public DadosLogado(Login login)
        {
            this.listaSeguros = new List<Seguro>();
            this.senha = login.senha;
            this.usuario = login.usuario;
        }
    }
}