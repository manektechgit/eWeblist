using System;

namespace EWebList.DataRepository.Model
{
    public class DropDownListItem
    {
        public long DropDownListItemID { get; set; }

        public string ItemName { get; set; }

        public string ItemValue { get; set; }

        public string Category { get; set; }

        public int DisplayOrder { get; set; }

        public long CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

        public long? ModifiedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public bool IsActive { get; set; }
    }
}