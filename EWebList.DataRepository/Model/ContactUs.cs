using System;

namespace EWebList.DataRepository.Model
{
    public class ContactUs
    {
        public int? ContactId { get; set; }

        public long SubjectId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Link { get; set; }

        public string Message { get; set; }

        public DateTime? CreatedDate { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public bool IsRead { get; set; }
    }
}