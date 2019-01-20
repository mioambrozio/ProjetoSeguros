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
        
        public static bool ValidaCPF(string vrCPF)

        {
            try
            {
                //substitui caracteres de mascara
                string valor = vrCPF.Replace(".", "").Replace("-", "");

                //vwrifica o tamanho
                if (valor.Length != 11)
                    return false;

                bool igual = true;
                //verifica repeticao de caracteres
                for (int i = 1; i < 11 && igual; i++)
                    if (valor[i] != valor[0])
                        igual = false;

                if (igual || valor == "12345678909")
                    return false;

                int[] numeros = new int[11];

                for (int i = 0; i < 11; i++)
                    numeros[i] = int.Parse(valor[i].ToString());

                int soma = 0;
                for (int i = 0; i < 9; i++)
                    soma += (10 - i) * numeros[i];

                int resultado = soma % 11;

                if (resultado == 1 || resultado == 0)
                {
                    if (numeros[9] != 0)
                        return false;
                }
                else if (numeros[9] != 11 - resultado)
                    return false;

                soma = 0;
                for (int i = 0; i < 10; i++)
                    soma += (11 - i) * numeros[i];

                resultado = soma % 11;

                if (resultado == 1 || resultado == 0)
                {
                    if (numeros[10] != 0)
                        return false;
                }
                else
                    if (numeros[10] != 11 - resultado)
                    return false;
            }
            catch
            {
                return false;
            }

            return true;
        }

        public static bool ValidaCNPJ(string vrCNPJ)
        {
            try
            {
                string CNPJ = vrCNPJ.Replace(".", "").Replace("/", "").Replace("-", "");

                int[] resultado = new int[2] { 0, 0 };
                int nrDig;
                const string ftmt = "6543298765432";
                bool[] CNPJOk = new bool[2] { false, false };
                int[] digitos = new int[14];
                int[] soma = new int[2] { 0, 0 };

                for (nrDig = 0; nrDig < 14; nrDig++)
                {
                    digitos[nrDig] = int.Parse(CNPJ.Substring(nrDig, 1));

                    if (nrDig <= 11)
                        soma[0] += (digitos[nrDig] * int.Parse(ftmt.Substring(nrDig + 1, 1)));

                    if (nrDig <= 12)
                        soma[1] += (digitos[nrDig] * int.Parse(ftmt.Substring(nrDig, 1)));
                }

                for (nrDig = 0; nrDig < 2; nrDig++)
                {
                    resultado[nrDig] = (soma[nrDig] % 11);

                    if ((resultado[nrDig] == 0) || (resultado[nrDig] == 1))
                        CNPJOk[nrDig] = (digitos[12 + nrDig] == 0);
                    else
                        CNPJOk[nrDig] = (digitos[12 + nrDig] == (11 - resultado[nrDig]));
                }
                return (CNPJOk[0] && CNPJOk[1]);
            }
            catch
            {
                return false;
            }
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