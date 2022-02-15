using System.Collections.Generic;

namespace EWebList.DataRepository.ViewModel
{
    public class CategorySubCategoryVM
    {
        public IEnumerable<CategoryVM> categoryVM { get; set; }
        public IEnumerable<SubCategoryVM> subCategoryVM { get; set; }
    }
}