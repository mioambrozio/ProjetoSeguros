using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ProjetoSeguros
{
    public class Helpers
    { /// <summary>
      /// Retorna um json serealizado
      /// </summary>
      /// <param name="model"></param>
      /// <returns></returns>
        public static string JsonEncode(object model)
        {
            return JsonConvert.SerializeObject(model, Formatting.None, new IsoDateTimeConverter() { DateTimeFormat = "dd/MM/yyyy HH:mm:ss" });
        }
    }
}