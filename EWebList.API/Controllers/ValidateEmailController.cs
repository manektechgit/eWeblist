using EWebList.Business.Abstract;
using EWebList.DataRepository.Model;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EWebList.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValidateEmailController : ControllerBase
    {
        #region "Declarations & Constructors"

        private readonly IEmailValidatorBusiness _emailValidatorBusiness;

        public ValidateEmailController(IEmailValidatorBusiness emailValidatorBusiness)
        {
            _emailValidatorBusiness = emailValidatorBusiness;
        }

        #endregion "Declarations & Constructors"

        #region "GET Methods"

        [HttpGet("validate/{email}")]
        public Response GetUserSetting(string email)
        {
            var isvalid = _emailValidatorBusiness.VerifyEmail(email);
            Response response = new Response(HttpStatusCode.OK, isvalid, AppConstant.Success);
            return response;
        }

        #endregion "GET Methods"
    }
}