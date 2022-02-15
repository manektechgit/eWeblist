using EWebList.Business.Abstract;
using EWebList.Common;
using EWebList.DataRepository.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EWebList.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        #region "Declarations & Constructors"

        private ImageHelpers _imageHelpers;
        private IUserMasterBusiness _userMasterBusiness;

        public UserController(IUserMasterBusiness userMasterBusiness, ImageHelpers imageHelpers)
        {
            _userMasterBusiness = userMasterBusiness;
            _imageHelpers = imageHelpers;
        }

        #endregion "Declarations & Constructors"

        #region "Get Methods"

        [AllowAnonymous]
        [HttpGet("forgetpassword/{email}")]
        public Response ForgetPassword(string email)
        {
            var users = _userMasterBusiness.ForgetPasswordAndEmail(email);
            Response response = new Response(HttpStatusCode.OK, users, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpGet("userbyemail/{email}")]
        public Response GetUserByEmail(string email)
        {
            var user = _userMasterBusiness.GetUserDetailByEmail(email);
            user.Password = CrptographyEngine.Base64Encode(CrptographyEngine.Decrypt(user.Password));
            Response response = new Response(HttpStatusCode.OK, user, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpGet("gettotalusers")]
        public Response GetTotalActiveUsers()
        {
            var totalUser = _userMasterBusiness.GetTotalActiveUsers();
            Response response = new Response(HttpStatusCode.OK, totalUser, AppConstant.Success);
            return response;
        }

        [HttpGet("getuserdetailbyid/{userId}")]
        public Response GetUserDetailById(long userId)
        {
            var users = _userMasterBusiness.GetUserDetailById(userId);
            Response response = new Response(HttpStatusCode.OK, users, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpGet("getuserdetailforresetpassword/{userId}")]
        public Response GetUserDetailForResetPassword(long userId)
        {
            var users = _userMasterBusiness.GetUserDetailById(userId);
            if (users != null)
            {
                users.Password = "";
            }
            Response response = new Response(HttpStatusCode.OK, users, AppConstant.Success);
            return response;
        }

        [HttpGet("getusers")]
        public Response GetUsers()
        {
            var users = _userMasterBusiness.GetAllUsers();
            Response response = new Response(HttpStatusCode.OK, users, AppConstant.Success);
            return response;
        }

        #endregion "Get Methods"

        #region "Post Methods"

        [HttpPost("activedeactiveuser")]
        public Response ActiveDeactiveUser([FromBody] UserMaster userMaster)
        {
            var user = _userMasterBusiness.ActiveDeactiveUser(userMaster);
            Response response = new Response(HttpStatusCode.OK, user, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("authenticateuser")]
        public Response AuthenticateUser([FromBody] AuthenticateRequest authenticateRequest)
        {
            var authentication = _userMasterBusiness.AuthenticateUser(authenticateRequest);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("resetPassword")]
        public Response ResetPassword([FromBody] UserMaster userMaster)
        {
            var user = _userMasterBusiness.ResetPassword(userMaster);
            Response response = new Response(HttpStatusCode.OK, user, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("resetpasswordnewuser")]
        public Response ResetPasswordNewUser([FromBody] UserMaster userMaster)
        {
            var user = _userMasterBusiness.ResetPasswordNewUser(userMaster);
            Response response = new Response(HttpStatusCode.OK, user, AppConstant.Success);
            return response;
        }

        [HttpPost("updateusermaster")]
        public Response UpdateUserMaster([FromBody] UserMaster userMaster)
        {
            processImageUpload(userMaster);
            var user = _userMasterBusiness.UpdateUserMaster(userMaster);
            Response response = new Response(HttpStatusCode.OK, user, AppConstant.Success);
            return response;
        }

        #endregion "Post Methods"

        #region "Helper Methods"

        private void processImageUpload(UserMaster userMaster)
        {
            if (userMaster.ProfileImage != null)
            {
                userMaster.ProfilePicture = userMaster.UserId.ToString() + "." + userMaster.ProfileImage.fileType.Split("/")[1];
                _imageHelpers.ConvertToBase64Image(userMaster.ProfileImage);
                _imageHelpers.UploadImage(userMaster.ProfileImage, userMaster.ProfilePicture, Helpers.FileUploadDirectoryEnum.User);
            }
        }

        #endregion "Helper Methods"
    }
}