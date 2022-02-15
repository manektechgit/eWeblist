using System;

namespace EWebList.DataRepository.Model
{
    public class DirectoryClickDetail
    {
        public int? Id { get; set; }

        public int DirectoryId { get; set; }

        public DateTime? ClickDate { get; set; }

        public long? UserId { get; set; }
    }
}