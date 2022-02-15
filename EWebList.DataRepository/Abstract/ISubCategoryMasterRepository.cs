using EWebList.DataRepository.Model;
using EWebList.DataRepository.ViewModel;
using System.Collections.Generic;

namespace EWebList.DataRepository.Abstract
{
    public interface ISubCategoryMasterRepository
    {
        IEnumerable<SubCategoryMaster> GetAllSubCategory();

        IEnumerable<SubCategoryMaster> GetAllSubCategoryByCategory(int categoryId);

        IEnumerable<SubCategoryVM> GetSubCategoryTotalDirectoryByCategory(int categoryId);

        SubCategoryMaster SubCategoryByName(int categoryId, string name);

        int InsertSubCategoryMaster(SubCategoryMaster subCategoryMaster);

        int UpdateSubCategoryMaster(SubCategoryMaster subCategoryMaster);
    }
}