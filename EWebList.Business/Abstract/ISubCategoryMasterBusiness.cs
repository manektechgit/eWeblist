using EWebList.DataRepository.Model;
using EWebList.DataRepository.ViewModel;
using System.Collections.Generic;

namespace EWebList.Business.Abstract
{
    public interface ISubCategoryMasterBusiness
    {
        IEnumerable<SubCategoryMaster> GetAllSubCategory();

        IEnumerable<SubCategoryMaster> GetAllSubCategoryByCategory(int categoryId);

        IEnumerable<SubCategoryVM> GetSubCategoryTotalDirectoryByCategory(int categoryId);

        int InsertSubCategoryMaster(SubCategoryMaster subCategoryMaster);

        SubCategoryMaster SubCategoryByName(int categoryId, string name);

        int UpdateSubCategoryMaster(SubCategoryMaster subCategoryMaster);
    }
}