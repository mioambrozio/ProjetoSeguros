using System.Web;
using System.Web.Optimization;

namespace ProjetoSeguros
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery")
                .Include("~/Scripts/plugins/jquery-{version}.js")
                .Include("~/Scripts/plugins/knockout-3.4.2.js")
                .Include("~/Scripts/plugins/knockout-3.4.2.debug.js")
                .Include("~/Scripts/plugins/knockout.mapping-latest.debug.js")
                .Include("~/Scripts/plugins/knockout.mapping-latest.js")
                .Include("~/Scripts/plugins/knockout.validation.js")
                .Include("~/Scripts/plugins/knockout-jqAutocomplete.js")
                .Include("~/Scripts/plugins/knockout-jqAutocomplete.min.js")
                .Include("~/Scripts/plugins/autoNumeric.js")
                .Include("~/Scripts/plugins/knockout-file-bindings.js")
                .Include("~/Scripts/plugins/knockoutsortable.js")
                .Include("~/Scripts/Framework_Base.js")
                );

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/plugins/jquery.validate*"));

            // Use a versão em desenvolvimento do Modernizr para desenvolver e aprender. Em seguida, quando estiver
            // pronto para a produção, utilize a ferramenta de build em https://modernizr.com para escolher somente os testes que precisa.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/plugins/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/plugins/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/Site.css"));

            bundles.Add(new ScriptBundle("~/bundles/Seguro").Include(
                        "~/Scripts/seguro/seguro.js"));

            bundles.Add(new ScriptBundle("~/bundles/Pesquisar").Include(
                        "~/Scripts/seguro/Pesquisar.js"));

            bundles.Add(new ScriptBundle("~/bundles/Excluir").Include(
                        "~/Scripts/seguro/Excluir.js"));

            bundles.Add(new ScriptBundle("~/bundles/EncontrarVeiculo").Include(
                        "~/Scripts/seguro/EncontrarVeiculo.js"));
        }
    }
}
