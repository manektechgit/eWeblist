using System;

namespace EWebList.DataRepository.Model
{
    public class DirectoryMaster
    {
        public int? DirectoryId { get; set; }

        public long UserId { get; set; }

        public int CategoryId { get; set; }

        public int SubCategoryId { get; set; }

        public string BusinessName { get; set; }

        public string WebsiteUrl { get; set; }

        public string Logo { get; set; }

        public string ListingHeadline { get; set; }

        public string Keywords { get; set; }

        public string Description { get; set; }

        public DateTime? CreatedDate { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public bool IsDeleted { get; set; }
        public int? recordsTotal { get; set; }
        public FileToUpload? DirectoryImage { get; set; }
        public bool? IsPremium { get; set; }
        public bool? IsExpired { get; set; }
        public DateTime? ExpireDate { get; set; }
        public bool? IsActive { get; set; }
    }
}