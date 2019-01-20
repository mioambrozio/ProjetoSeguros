
using System;

namespace ProjetoSeguros.Models
{
    public class Utilitarios
    { }

    public class Retorno
    {
        public bool Sucesso { get; set; }
        public Object Resultado { get; set; }
        public string Mensagem { get; set; }
        public long Status { get; set; }
        public long Codigo { get; set; }

        public Retorno()        {        }

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

        public Retorno(bool sucesso, Object resultado, string mensagem)
        {
            this.Sucesso = sucesso;
            this.Resultado = resultado;
            this.Mensagem = mensagem;
        }
    }
    
}