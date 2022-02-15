using EWebList.Business.Abstract;
using EWebList.DataRepository.Abstract;
using EWebList.DataRepository.Model;
using EWebList.DataRepository.ViewModel;
using System.Collections.Generic;

namespace EWebList.Business.Concrete
{
    public class SubCategoryMasterBusiness : ISubCategoryMasterBusiness
    {
        private readonly ISubCategoryMasterRepository _subCategoryMasterRepository;

        public SubCategoryMasterBusiness(ISubCategoryMasterRepository subCategoryMasterRepository)
        {
            _subCategoryMasterRepository = subCategoryMasterRepository;
        }

        public IEnumerable<SubCategoryMaster> GetAllSubCategory()
        {
            return _subCategoryMasterRepository.GetAllSubCategory();
        }

        public IEnumerable<SubCategoryMaster> GetAllSubCategoryByCategory(int categoryId)
        {
            return _subCategoryMasterRepository.GetAllSubCategoryByCategory(categoryId);
        }

        public IEnumerable<SubCategoryVM> GetSubCategoryTotalDirectoryByCategory(int categoryId)
        {
            return _subCategoryMasterRepository.GetSubCategoryTotalDirectoryByCategory(categoryId);
            ;
        }

        public int InsertSubCategoryMaster(SubCategoryMaster subCategoryMaster)
        {
            return _subCategoryMasterRepository.InsertSubCategoryMaster(subCategoryMaster);
        }

        public SubCategoryMaster SubCategoryByName(int categoryId, string name)
        {
            return _subCategoryMasterRepository.SubCategoryByName(categoryId, name);
        }

        public int UpdateSubCategoryMaster(SubCategoryMaster subCategoryMaster)
        {
            return _subCategoryMasterRepository.UpdateSubCategoryMaster(subCategoryMaster);
        }
    }
}