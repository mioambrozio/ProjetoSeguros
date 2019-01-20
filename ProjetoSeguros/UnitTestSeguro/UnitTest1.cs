using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjetoSeguros.Models;

namespace UnitTestSeguro
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestarCPFValido()
        {
            Seguro s = new Seguro() {
                id = 1,
                indTipo = 3,
                numCliente = "834.284.690-38",
                objetoSegurado = "672.175.710-90"
            };

            Assert.AreEqual(true, Utilitarios.ValidaCPF(s.numCliente), "Número do cliente inválido");
        }

        [TestMethod]
        public void TestarCPFInvalido()
        {
            Seguro s = new Seguro()
            {
                id = 1,
                indTipo = 3,
                numCliente = "098.098.098-09",
                objetoSegurado = "672.175.710-90"
            };

            Assert.AreEqual(true, Utilitarios.ValidaCPF(s.numCliente), "Número do cliente inválido");
        }

        [TestMethod]
        public void TestarCNPJValido()
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

        [TestMethod]
        public void TestarCNPJInvalido()
        {
            Seguro s = new Seguro()
            {
                id = 1,
                indTipo = 3,
                numCliente = "00.009.232/9991-20",
                objetoSegurado = "672.175.710-90"
            };

            Assert.AreEqual(true, Utilitarios.ValidaCNPJ(s.numCliente), "Número do cliente inválido");
        }

    }
}
