using EWebList.Business.Abstract;
using EWebList.DataRepository.Model;
using EWebList.DataRepository.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EWebList.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DirectoryClickDetailController : ControllerBase
    {
        #region "Declarations & Constructors"

        private IDirectoryClickDetailBusiness _directoryClickDetailBusiness;

        public DirectoryClickDetailController(IDirectoryClickDetailBusiness directoryClickDetailBusiness)
        {
            _directoryClickDetailBusiness = directoryClickDetailBusiness;
        }

        #endregion "Declarations & Constructors"

        #region "Get Methods"

        //Get Methoids

        #endregion "Get Methods"

        #region "Post Methods"

        [AllowAnonymous]
        [HttpPost("insertdirectoryclick")]
        public Response InsertDirectoryClick([FromBody]DirectoryClickDetail directoryClickDetail)
        {
            var result = _directoryClickDetailBusiness.InsertDirectoryClick(directoryClickDetail);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpPost("getsiteclickdetails")]
        public Response GetSiteClickDetails([FromBody]SiteTotalChartDataRequest siteTotalClicksRequest)
        {
            var result = _directoryClickDetailBusiness.GetSiteClickDetails(siteTotalClicksRequest);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpPost("getdirectorypublishdata")]
        public Response GetDirectoryPublishData([FromBody]SiteTotalChartDataRequest siteTotalClicksRequest)
        {
            var result = _directoryClickDetailBusiness.GetDirectoryPublishData(siteTotalClicksRequest);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        #endregion "Post Methods"
    }
}