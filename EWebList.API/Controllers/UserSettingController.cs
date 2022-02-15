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
    public class UserSettingController : ControllerBase
    {
        #region "Declarations & Constructors"

        private readonly IUserSettingBusiness _userSettingBusiness;

        public UserSettingController(IUserSettingBusiness userSettingBusiness)
        {
            _userSettingBusiness = userSettingBusiness;
        }

        #endregion "Declarations & Constructors"

        #region "GET Methods"

        [HttpGet("getusersetting/{userId}")]
        public Response GetUserSetting(long userId)
        {
            var userSetting = _userSettingBusiness.GetUserSetting(userId);
            Response response = new Response(HttpStatusCode.OK, userSetting, AppConstant.Success);
            return response;
        }

        #endregion "GET Methods"

        #region "POST Methods"

        [HttpPost("updateusersetting")]
        public Response UpdateUserSetting([FromBody] UserSetting userSetting)
        {
            var users = _userSettingBusiness.UpdateUserSetting(userSetting);
            Response response = new Response(HttpStatusCode.OK, users, AppConstant.Success);
            return response;
        }

        #endregion "POST Methods"
    }
}