using EWebList.Business.Abstract;
using EWebList.DataRepository.Model;
using EWebList.DataRepository.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EWebList.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DirectoryMasterController : ControllerBase
    {
        #region "Declarations & Constructors"

        private IDirectoryMasterBusiness _directoryMasterBusiness;
        private ImageHelpers _imageHelpers;

        public DirectoryMasterController(IDirectoryMasterBusiness directoryMasterBusiness, ImageHelpers imageHelpers)
        {
            _imageHelpers = imageHelpers;
            _directoryMasterBusiness = directoryMasterBusiness;
        }

        #endregion "Declarations & Constructors"

        #region "Get Methods"

        [HttpGet("getdirectorybycategory/{categoryId}")]
        public Response GetDirectoryByCategory(int categoryId)
        {
            var result = _directoryMasterBusiness.GetDirectoryFilterby(categoryId);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpGet("getdirectorybycategorysearchtext/{categoryId}/{searchText}")]
        public Response GetDirectoryByCategorySearchText(int categoryId, string searchText)
        {
            var result = _directoryMasterBusiness.GetDirectoryFilterby(categoryId, searchText);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpGet("getdirectorybydirectory/{directoryId}")]
        public Response GetDirectoryByDirectoryId(int directoryId)
        {
            var result = _directoryMasterBusiness.GetDirectoryByDirectoryId(directoryId);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpGet("getdirectorybyuser/{userId}")]
        public Response GetDirectoryByUser(int userId)
        {
            var result = _directoryMasterBusiness.GetDirectoryByUser(userId);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }
        [HttpGet("mysites/{userId}")]
        public Response MySites(int userId)
        {
            var result = _directoryMasterBusiness.MySites(userId);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpGet("gettotaldirectory")]
        public Response GetTotalDirectory()
        {
            var totalDirectory = _directoryMasterBusiness.GetTotalDirectory();
            Response response = new Response(HttpStatusCode.OK, totalDirectory, AppConstant.Success);
            return response;
        }

        [HttpGet("GetUserAndDirectoryPlanDetails")]
        public Response GetUserAndDirectoryPlanDetails()
        {
            DirectoryVsUserVM directoryVsUserVM = _directoryMasterBusiness.GetUserAndDirectoryPlanDetails();
            Response response = new Response(HttpStatusCode.OK, directoryVsUserVM, AppConstant.Success);
            return response;
        }

        
        [HttpGet("GetTodaysCreatedDirectoryDetails")]
        public Response GetTodaysCreatedDirectoryDetails()
        {
            DirectoryVsUserVM directoryVsUserVM = _directoryMasterBusiness.GetTodaysCreatedDirectoryDetails();
            Response response = new Response(HttpStatusCode.OK, directoryVsUserVM, AppConstant.Success);
            return response;
        }

        [HttpGet("GetTomorrowExpireDirectoryDetails")]
        public Response GetTomorrowExpireDirectoryDetails()
        {
            DirectoryVsUserVM directoryVsUserVM = _directoryMasterBusiness.GetTomorrowExpireDirectoryDetails();
            Response response = new Response(HttpStatusCode.OK, directoryVsUserVM, AppConstant.Success);
            return response;
        }

        #endregion "Get Methods"

        #region "Post Methods"

        [HttpPost("deletedirectory")]
        public Response DeleteDirectory([FromBody] DirectoryMaster directoryMaster)
        {
            var result = _directoryMasterBusiness.DeleteDirectory(directoryMaster);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpPost("insertdirectory")]
        public Response InsertDirectory([FromBody] DirectoryVsUserVM directoryVsUserVM)
        {
            Response response;
            var isWebsteExists = _directoryMasterBusiness.IsWebsiteExist(directoryVsUserVM.directoryMaster);
            if (isWebsteExists)
            {
                response = new Response(HttpStatusCode.IMUsed, isWebsteExists, AppConstant.WESITE_ALREADY_EXISTS);
                return response;
            }
            var result = _directoryMasterBusiness.InsertDirectoryNonRegisterUser(directoryVsUserVM);
            if (result.DirectoryId != 0)
            {
                processImageUpload(directoryVsUserVM.directoryMaster, result.DirectoryId);
                _directoryMasterBusiness.UpdateLogo(result.DirectoryId, directoryVsUserVM.directoryMaster.Logo);
            }
            response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpPost("insertdirectoryregisteruser")]
        public Response InsertDirectoryRegisterUser([FromBody] DirectoryMaster directoryMaster)
        {
            Response response;
            var isWebsteExists = _directoryMasterBusiness.IsWebsiteExist(directoryMaster);
            if (isWebsteExists)
            {
                response = new Response(HttpStatusCode.IMUsed, isWebsteExists, AppConstant.WESITE_ALREADY_EXISTS);
                return response;
            }
            var result = _directoryMasterBusiness.InsertDirectoryRegisterUser(directoryMaster);
            processImageUpload(directoryMaster, result);
            _directoryMasterBusiness.UpdateLogo(result, directoryMaster.Logo);
            response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpPost("updatedirectory")]
        public Response UpdateDirectory([FromBody] DirectoryMaster directoryMaster)
        {
            Response response;
            var isWebsteExists = _directoryMasterBusiness.IsWebsiteExist(directoryMaster);
            if (isWebsteExists)
            {
                response = new Response(HttpStatusCode.IMUsed, isWebsteExists, AppConstant.WESITE_ALREADY_EXISTS);
                return response;
            }
            processImageUpload(directoryMaster, directoryMaster?.DirectoryId);
            var result = _directoryMasterBusiness.UpdateDirectory(directoryMaster);
            response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpPost("getalldirectory")]
        public Response GetAllDirectory([FromBody]PaginationModel paginationModel)
        {
            var result = _directoryMasterBusiness.GetAllDirectory(paginationModel);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        #endregion "Post Methods"

        #region "Helper Methods"

        private void processImageUpload(DirectoryMaster directoryMaster, int? directoryId)
        {
            if (directoryMaster.DirectoryImage != null)
            {
                directoryMaster.Logo = directoryId.ToString() + "." + directoryMaster.DirectoryImage.fileType.Split("/")[1];
                _imageHelpers.ConvertToBase64Image(directoryMaster.DirectoryImage);
                _imageHelpers.UploadImage(directoryMaster.DirectoryImage, directoryMaster.Logo, Helpers.FileUploadDirectoryEnum.Directory);
            }
        }

        #endregion "Helper Methods"
    }
}