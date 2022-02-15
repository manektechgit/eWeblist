using EWebList.Business.Abstract;
using EWebList.DataRepository.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EWebList.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryMasterController : ControllerBase
    {
        #region "Declarations & Constructors"

        private ICategoryMasterBusiness _categoryMasterBusiness;
        private ImageHelpers _imageHelpers;

        public CategoryMasterController(ICategoryMasterBusiness categoryMasterBusiness, ImageHelpers imageHelpers)
        {
            _categoryMasterBusiness = categoryMasterBusiness;
            _imageHelpers = imageHelpers;
        }

        #endregion "Declarations & Constructors"

        #region "Get Methods"

        [HttpGet("getallcategory")]
        public Response GetAllCategory()
        {
            var result = _categoryMasterBusiness.GetAllCategory();
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpGet("getAllCategorywithtotaldirectory")]
        public Response GetAllCategoryDetailWithTotalDirectory()
        {
            var result = _categoryMasterBusiness.GetAllCategoryDetailWithTotalDirectory();
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpGet("getcategorybyname/{categoryName}")]
        public Response GetCategoryByName(string categoryName)
        {
            var result = _categoryMasterBusiness.CategoryByName(categoryName);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpGet("getcategorybytotaldirectoryuser/{userId}")]
        public Response GetCategoryByTotalDirectoryUser(long userId)
        {
            var result = _categoryMasterBusiness.GetCategoryByTotalDirectoryUser(userId);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpGet("getcategorysubcategoryalphabatically/{alphabet}")]
        public Response GetCategorySubCategoryAlphabatically(string alphabet)
        {
            var result = _categoryMasterBusiness.GetCategorySubCategoryAlphabatically(alphabet);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpGet("gettotalcategory")]
        public Response GetTotalCategory()
        {
            var totalCategory = _categoryMasterBusiness.GetTotalCategory();
            Response response = new Response(HttpStatusCode.OK, totalCategory, AppConstant.Success);
            return response;
        }

        #endregion "Get Methods"

        #region "Post Methods"

        [Authorize]
        [HttpPost("insertcategory")]
        public Response InsertCategory([FromBody] CategoryMaster categoryMaster)
        {
            processImageUpload(categoryMaster);
            var result = _categoryMasterBusiness.InsertCategoryMaster(categoryMaster);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [Authorize]
        [HttpPost("updatecategory")]
        public Response UpdateCategory([FromBody] CategoryMaster categoryMaster)
        {
            processImageUpload(categoryMaster);
            var result = _categoryMasterBusiness.UpdateCategoryMaster(categoryMaster);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        #endregion "Post Methods"

        #region "Helper Methods"

        private void processImageUpload(CategoryMaster categoryMaster)
        {
            if (categoryMaster.CategoryImage != null)
            {
                categoryMaster.IconName = categoryMaster.Name.Replace(" ", "-") + "." + categoryMaster.CategoryImage.fileType.Split("/")[1];
                _imageHelpers.ConvertToBase64Image(categoryMaster.CategoryImage);
                _imageHelpers.UploadImage(categoryMaster.CategoryImage, categoryMaster.IconName, Helpers.FileUploadDirectoryEnum.Category);
            }
        }

        #endregion "Helper Methods"
    }
}