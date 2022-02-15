using EWebList.DataRepository.Abstract;
using EWebList.DataRepository.Model;
using System.Collections.Generic;
using System.Linq;

namespace EWebList.DataRepository.Concrete
{
    public class DropDownListItemRepository : IDropDownListItemRepository
    {
        private readonly IGeneralGenericFunction _generalGenericFunction;

        public DropDownListItemRepository(IGeneralGenericFunction generalGenericFunction)
        {
            _generalGenericFunction = generalGenericFunction;
        }

        public IEnumerable<DropDownListItem> GetDropDownList(string categoryName)
        {
            string where = " Category = '" + categoryName + "'  And ";
            return _generalGenericFunction.GetAllField<DropDownListItem>(where, "DropDownListItem", "DisplayOrder");
        }

        public DropDownListItem GetDropDonListItemById(long dropDownListItemID)
        {
            string where = " DropDownListItemID = '" + dropDownListItemID + "'  And ";
            return _generalGenericFunction.GetAllField<DropDownListItem>(where, "DropDownListItem", "DisplayOrder").FirstOrDefault();
        }
    }
}