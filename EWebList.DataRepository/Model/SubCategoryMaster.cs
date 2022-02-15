using System;

namespace EWebList.DataRepository.Model
{
    public class SubCategoryMaster
    {
        public int? SubCategoryId { get; set; }

        public int CategoryId { get; set; }

        public string Name { get; set; }

        public string IconName { get; set; }

        public long CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

        public long? ModifiedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public bool IsActive { get; set; }
        public string SlugName { get; set; }
        public FileToUpload? SubCategoryImage { get; set; }
    }
}