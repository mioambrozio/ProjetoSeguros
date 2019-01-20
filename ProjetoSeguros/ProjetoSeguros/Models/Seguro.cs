using System.Collections.Generic;

namespace ProjetoSeguros.Models
{
    public class Seguro
    {
        public int id { get; set; }
        public string numCliente { get; set; }
        /// <summary>
        /// 1:automovel 2:residencial 3: vida
        /// </summary>
        public int indTipo { get; set; }
        public string dscTipo { get; set; }
        public string objetoSegurado { get; set; }
        public bool inserir { get; set; }

        public Seguro()
        {
        }
        public Seguro(bool inserir)
        {
            this.inserir = inserir;
        }
    }

    public class BuscarSeguro
    {
        public int indOpcao { get; set; }
        public string numPlaca { get; set; }
        public List<Seguro> lista { get; set; }
        public BuscarSeguro()
        {
            lista = new List<Seguro>();
        }
    }

    public class EncontrarVeiculo : Seguro
    {
        public string numPlaca { get; set; }
        public string dscObjetoSegurado { get; set; }

        public EncontrarVeiculo() { }

        public EncontrarVeiculo(Seguro s)
        {
            this.dscObjetoSegurado = s.indTipo == 1 ? "Placa: " : s.indTipo == 2 ? "Endereço: " : s.indTipo == 3 ? "CPF: " : "";
            this.dscTipo = s.indTipo == 1 ? "Automóvel" : s.indTipo == 2 ? "Residencial" : s.indTipo == 3 ? "Vida" : "";
            this.id = s.id;
            this.indTipo = s.indTipo;
            this.numCliente = s.numCliente;
            this.objetoSegurado = s.objetoSegurado;
        }
    }


}