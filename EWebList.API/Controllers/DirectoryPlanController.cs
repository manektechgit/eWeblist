using EWebList.Business.Abstract;
using EWebList.DataRepository.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EWebList.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DirectoryPlanController : ControllerBase
    {
        #region "Declarations & Constructors"

        private readonly IDirectoryPlanDetailsBusiness _directoryPlanDetailsBusiness;

        public DirectoryPlanController(IDirectoryPlanDetailsBusiness directoryPlanDetailsBusiness)
        {
            _directoryPlanDetailsBusiness = directoryPlanDetailsBusiness;
        }

        #endregion "Declarations & Constructors"

        #region "Get Methods"

        [HttpGet("getuserdirectoryplan/{userId}")]
        public Response GetUserDirectoryPlan(int userId)
        {
            var result = _directoryPlanDetailsBusiness.GetUserDirectoryPlan(userId);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        #endregion "Get Methods"

        #region "Post Methods"

        [HttpPost("insertdirectoryplan")]
        public Response InsertDirectoryPlanDetail([FromBody] DirectoryPlanDetails directoryPlanDetails)
        {
            var result = _directoryPlanDetailsBusiness.InsertDirectoryPlanDetail(directoryPlanDetails);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        #endregion "Post Methods"
    }
}