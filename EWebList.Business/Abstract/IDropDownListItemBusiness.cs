using EWebList.DataRepository.Model;
using System.Collections.Generic;

namespace EWebList.Business.Abstract
{
    public interface IDropDownListItemBusiness
    {
        IEnumerable<DropDownListItem> GetDropDownList(string categoryName);

        DropDownListItem GetDropDonListItemById(long dropDownListItemID);
    }
}