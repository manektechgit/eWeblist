using System;

namespace EWebList.DataRepository.Model
{
    public class UserMaster
    {
        public long UserId { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }

        public string Title { get; set; }

        public string RegistrationName { get; set; }
        public string ProfilePicture { get; set; }
        public string CountryCode { get; set; }

        public string ContactNo { get; set; }
        public int RoleId { get; set; }

        public DateTime? CreatedDate { get; set; }

        public DateTime? ModifiedDate { get; set; }
        public long? ModifiedBy { get; set; }

        public bool IsActive { get; set; }
        public bool IsApproved { get; set; }
        public FileToUpload? ProfileImage { get; set; }
    }
}