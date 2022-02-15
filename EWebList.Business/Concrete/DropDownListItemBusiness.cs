using EWebList.Business.Abstract;
using EWebList.DataRepository.Abstract;
using EWebList.DataRepository.Model;
using System.Collections.Generic;

namespace EWebList.Business.Concrete
{
    public class DropDownListItemBusiness : IDropDownListItemBusiness
    {
        private readonly IDropDownListItemRepository _dropDownListItemRepository;

        public DropDownListItemBusiness(IDropDownListItemRepository dropDownListItemRepository)
        {
            _dropDownListItemRepository = dropDownListItemRepository;
        }

        public DropDownListItem GetDropDonListItemById(long dropDownListItemID)
        {
            return _dropDownListItemRepository.GetDropDonListItemById(dropDownListItemID);
        }

        public IEnumerable<DropDownListItem> GetDropDownList(string categoryName)
        {
            return _dropDownListItemRepository.GetDropDownList(categoryName);
        }
    }
}