using System.Collections.Generic;
using System.Web.Mvc;
using TypeAhead.Models;

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
        public JsonResult GetDummyDict()
        {
            var list = new List<DummyDict>();

            for (int i = 0; i < 10; i++)
            {
                list.Add(new DummyDict { Id = i, Value = "value of " + i.ToString() });
            }

            return Json(list, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}