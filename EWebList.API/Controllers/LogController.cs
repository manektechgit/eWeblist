using EWebList.DataRepository.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;

namespace EWebList.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogController : ControllerBase
    {
        [HttpPost("insertlog")]
        public Response UpdateUserSetting([FromBody] IEnumerable<LogModel> logModel)
        {
            foreach (var item in logModel)
            {
                Logger.AngularError("Angular Error", item.LogTime.ToString() + " : " + item.LogText.ToString());
            }
            Response response = new Response(HttpStatusCode.OK, true, AppConstant.Success);
            return response;
        }
    }
}