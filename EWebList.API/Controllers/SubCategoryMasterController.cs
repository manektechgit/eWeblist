using EWebList.Business.Abstract;
using EWebList.DataRepository.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace EWebList.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubCategoryMasterController : ControllerBase
    {
        #region "Declarations & Constructors"

        public readonly ISubCategoryMasterBusiness _subCategoryMasterBusiness;
        private ImageHelpers _imageHelpers;

        public SubCategoryMasterController(ISubCategoryMasterBusiness subCategoryMasterBusiness, ImageHelpers imageHelpers)
        {
            _subCategoryMasterBusiness = subCategoryMasterBusiness;
            _imageHelpers = imageHelpers;
        }

        #endregion "Declarations & Constructors"

        #region "Get Methods"

        [HttpGet("getallsubcategory")]
        public Response GetAllSubCategory()
        {
            var result = _subCategoryMasterBusiness.GetAllSubCategory();
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpGet("getallsubcategorybycategory/{categoryId}")]
        public Response GetAllSubCategoryByCategory(int categoryId)
        {
            var result = _subCategoryMasterBusiness.GetAllSubCategoryByCategory(categoryId);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpGet("getsubcategorytotaldirectorybycategory/{categoryId}")]
        public Response GetSubCategoryTotalDirectoryByCategory(int categoryId)
        {
            var result = _subCategoryMasterBusiness.GetSubCategoryTotalDirectoryByCategory(categoryId);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpGet("subcategorybyname/{categoryId}/{name}")]
        public Response SubCategoryByName(int categoryId, string name)
        {
            var result = _subCategoryMasterBusiness.SubCategoryByName(categoryId, name);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        #endregion "Get Methods"

        #region "Post Methods"

        [Authorize]
        [HttpPost("insertsubcategory")]
        public Response InsertSubCategory([FromBody] SubCategoryMaster subCategoryMaster)
        {
            processImageUpload(subCategoryMaster);
            var result = _subCategoryMasterBusiness.InsertSubCategoryMaster(subCategoryMaster);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [Authorize]
        [HttpPost("updatesubcategory")]
        public Response UpdateSubCategory([FromBody] SubCategoryMaster subCategoryMaster)
        {
            processImageUpload(subCategoryMaster);
            var result = _subCategoryMasterBusiness.UpdateSubCategoryMaster(subCategoryMaster);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        #endregion "Post Methods"

        #region "Helper Methods"

        private void processImageUpload(SubCategoryMaster subCategoryMaster)
        {
            if (subCategoryMaster.SubCategoryImage != null)
            {
                subCategoryMaster.IconName = subCategoryMaster.Name.Replace(" ", "-") + "." + subCategoryMaster.SubCategoryImage.fileType.Split("/")[1];
                _imageHelpers.ConvertToBase64Image(subCategoryMaster.SubCategoryImage);
                _imageHelpers.UploadImage(subCategoryMaster.SubCategoryImage, subCategoryMaster.IconName, Helpers.FileUploadDirectoryEnum.SubCategory);
            }
        }

        #endregion "Helper Methods"
    }
}