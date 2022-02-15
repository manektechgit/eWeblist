using System;

namespace EWebList.DataRepository.Model
{
    public class CategoryMaster
    {
        public int? CategoryId { get; set; }

        public string Name { get; set; }

        public string IconName { get; set; }

        public long CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

        public long? ModifyBy { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public bool IsActive { get; set; }
        public string SlugName { get; set; }
        public FileToUpload? CategoryImage { get; set; }
    }
}