using EWebList.Business.Abstract;
using EWebList.DataRepository.Model;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EWebList.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactUsController : ControllerBase
    {
        #region "Declarations & Constructors"

        private IContactUsBusiness _contactUsBusiness;

        public ContactUsController(IContactUsBusiness contactUsBusiness)
        {
            _contactUsBusiness = contactUsBusiness;
        }

        #endregion "Declarations & Constructors"

        #region "Get Methods"

        //Get Methods

        #endregion "Get Methods"

        #region "Post Methods"

        [HttpPost("insertcontactinfo")]
        public Response InsertContactInfo([FromBody] ContactUs contactUs)
        {
            var result = _contactUsBusiness.InsertContactInfo(contactUs);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        #endregion "Post Methods"
    }
}