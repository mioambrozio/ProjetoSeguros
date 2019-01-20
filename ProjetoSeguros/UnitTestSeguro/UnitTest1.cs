using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjetoSeguros.Models;

namespace UnitTestSeguro
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestarCPFCliente()
        {
            Seguro s = new Seguro() {
                id = 1,
                indTipo = 3,
                numCliente = "098.098.098-09",
                objetoSegurado = "672.175.710-90"
            };

            Assert.AreEqual(true, Utilitarios.ValidaCPF(s.numCliente), "Número do cliente inválido");
        }

        [TestMethod]
        public void TestarCNPJ()
        {
            Seguro s = new Seguro()
            {
                id = 1,
                indTipo = 3,
                numCliente = "98.896.295/0001-20",
                objetoSegurado = "672.175.710-90"
            };

            Assert.AreEqual(true, Utilitarios.ValidaCNPJ(s.numCliente), "Número do cliente inválido");
        }        

    }
}
