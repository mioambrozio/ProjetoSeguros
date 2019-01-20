using System.Web;
using System.Web.Optimization;

namespace ProjetoSeguros
{
    public class BundleConfig
    {
        // Para obter mais informações sobre o agrupamento, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery")
                .Include("~/Scripts/jquery-{version}.js")
                .Include("~/Scripts/knockout-3.4.2.js")
                .Include("~/Scripts/knockout-3.4.2.debug.js")
                .Include("~/Scripts/knockout.mapping-latest.debug.js")
                .Include("~/Scripts/knockout.mapping-latest.js")
                .Include("~/Scripts/knockout.validation.js")
                .Include("~/Scripts/ko-components.js")
                .Include("~/Scripts/ko-components.js")
                .Include("~/Scripts/knockout-jqAutocomplete.js")
                .Include("~/Scripts/knockout-jqAutocomplete.min.js")
                .Include("~/Scripts/autoNumeric.js")
                .Include("~/Scripts/knockout-file-bindings.js")
                .Include("~/Scripts/knockoutsortable.js")
                .Include("~/Scripts/Framework_Base.js")
                );

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use a versão em desenvolvimento do Modernizr para desenvolver e aprender. Em seguida, quando estiver
            // pronto para a produção, utilize a ferramenta de build em https://modernizr.com para escolher somente os testes que precisa.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/Site.css"));

            bundles.Add(new ScriptBundle("~/bundles/Seguro").Include(
                        "~/Scripts/seguro.js"));

            bundles.Add(new ScriptBundle("~/bundles/Pesquisar").Include(
                        "~/Scripts/Pesquisar.js"));

            bundles.Add(new ScriptBundle("~/bundles/Excluir").Include(
                        "~/Scripts/Excluir.js"));

            bundles.Add(new ScriptBundle("~/bundles/EncontrarVeiculo").Include(
                        "~/Scripts/EncontrarVeiculo.js"));
        }
    }
}
