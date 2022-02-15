using EWebList.Business.Abstract;
using EWebList.DataRepository.Abstract;
using EWebList.DataRepository.Model;
using EWebList.DataRepository.ViewModel;
using System.Collections.Generic;

namespace EWebList.Business.Concrete
{
    public class CategoryMasterBusiness : ICategoryMasterBusiness
    {
        private readonly ICategoryMasterRepository _categoryMasterRepository;

        public CategoryMasterBusiness(ICategoryMasterRepository categoryMasterRepository)
        {
            _categoryMasterRepository = categoryMasterRepository;
        }

        public IEnumerable<CategoryMaster> GetAllCategory()
        {
            return _categoryMasterRepository.GetAllCategory();
        }

        public IEnumerable<CategoryVM> GetAllCategoryDetailWithTotalDirectory()
        {
            return _categoryMasterRepository.GetAllCategoryDetailWithTotalDirectory();
        }

        public CategoryMaster CategoryByName(string name)
        {
            return _categoryMasterRepository.CategoryByName(name);
        }

        public IEnumerable<CategoryVM> GetCategoryByTotalDirectoryUser(long userId)
        {
            return _categoryMasterRepository.GetCategoryByTotalDirectoryUser(userId);
        }

        public CategorySubCategoryVM GetCategorySubCategoryAlphabatically(string alphabet)
        {
            return _categoryMasterRepository.GetCategorySubCategoryAlphabatically(alphabet);
        }

        public int GetTotalCategory()
        {
            return _categoryMasterRepository.GetTotalCategory();
        }

        public int InsertCategoryMaster(CategoryMaster categoryMaster)
        {
            return _categoryMasterRepository.InsertCategoryMaster(categoryMaster);
        }

        public int UpdateCategoryMaster(CategoryMaster categoryMaster)
        {
            return _categoryMasterRepository.UpdateCategoryMaster(categoryMaster);
        }
    }
}