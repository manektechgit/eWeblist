using EWebList.DataRepository.Model;
using EWebList.DataRepository.ViewModel;
using System.Collections.Generic;

namespace EWebList.DataRepository.Abstract
{
    public interface ICategoryMasterRepository
    {
        IEnumerable<CategoryMaster> GetAllCategory();

        IEnumerable<CategoryVM> GetAllCategoryDetailWithTotalDirectory();

        CategoryMaster CategoryByName(string name);

        IEnumerable<CategoryVM> GetCategoryByTotalDirectoryUser(long userId);

        CategorySubCategoryVM GetCategorySubCategoryAlphabatically(string alphabet);

        int GetTotalCategory();

        int InsertCategoryMaster(CategoryMaster categoryMaster);

        int UpdateCategoryMaster(CategoryMaster categoryMaster);
    }
}