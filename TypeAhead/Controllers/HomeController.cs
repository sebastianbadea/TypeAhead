using System.Collections.Generic;
using System.Web.Mvc;
using TypeAhead.Models;
using System.Linq;

namespace TypeAhead.Controllers
{
    public class HomeController : Controller
    {
        #region action methods
        public ActionResult SimpleRemote()
        {
            return View();
        }

        public ActionResult GoogleMap()
        {
            return View();
        }

        public ActionResult WithTemplate()
        {
            return View();
        }
        #endregion

        #region json methods
        public JsonResult GetDummyDict(string nameContains)
        {
            var list = CreateDummyList();

            return 
                Json
                (
                    list.Where(d => d.Value.Contains(nameContains)).ToList(), 
                    JsonRequestBehavior.AllowGet
                );
        }

        public JsonResult GetTempl(string templName)
        {
            var list = CreateTemplList();

            return 
                Json
                (
                    list.Where(t => t.Name.Contains(templName)).ToList(), 
                    JsonRequestBehavior.AllowGet
                );
        }

        #endregion

        #region private methods
        private List<DummyDict> CreateDummyList()
        {
            var list = new List<DummyDict>();

            for (int i = 0; i < 10; i++)
            {
                list.Add(new DummyDict { Id = i, Value = "value of " + i.ToString() });
            }
            return list;
        }

        private List<Templ> CreateTemplList()
        {
            var list = new List<Templ>();

            for (int i = 0; i < 10; i++)
            {
                list.Add
                (
                    new Templ
                    {
                        Id = i,
                        Name = "Name " + i.ToString(),
                        Description = "This a silly description for " + i.ToString()
                    }
                );
            }
            return list;
        }
        #endregion
    }
}