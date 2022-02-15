using EWebList.Business.Abstract;
using EWebList.DataRepository.Model;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EWebList.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryCodeController : ControllerBase
    {
        #region "Declarations & Constructors"

        private ICountryCodeBusiness _countryCodeBusiness;

        public CountryCodeController(ICountryCodeBusiness countryCodeBusiness)
        {
            _countryCodeBusiness = countryCodeBusiness;
        }

        #endregion "Declarations & Constructors"

        #region "Get Methods"

        [HttpGet("getallcountrycodes")]
        public Response GetAllCountryCodes()
        {
            var result = _countryCodeBusiness.GetAllCountryCodes();
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        #endregion "Get Methods"
    }
}