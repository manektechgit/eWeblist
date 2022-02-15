using EWebList.DataRepository.Model;
using System.Collections.Generic;

namespace EWebList.DataRepository.Abstract
{
    public interface IDropDownListItemRepository
    {
        IEnumerable<DropDownListItem> GetDropDownList(string categoryName);

        DropDownListItem GetDropDonListItemById(long dropDownListItemID);
    }
}