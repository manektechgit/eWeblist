using EWebList.Business.Abstract;
using EWebList.DataRepository.Model;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EWebList.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DropDownListItemController : ControllerBase
    {
        #region "Declarations & Constructors"

        private readonly IDropDownListItemBusiness _dropDownListItemBusiness;

        public DropDownListItemController(IDropDownListItemBusiness dropDownListItemBusiness)
        {
            _dropDownListItemBusiness = dropDownListItemBusiness;
        }

        #endregion "Declarations & Constructors"

        #region "Get Methods"

        [HttpGet("getdropdownlist/{categoryName}")]
        public Response GetDropDownList(string categoryName)
        {
            var result = _dropDownListItemBusiness.GetDropDownList(categoryName);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        #endregion "Get Methods"
    }
}