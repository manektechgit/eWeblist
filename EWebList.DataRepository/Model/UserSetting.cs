using System;

namespace EWebList.DataRepository.Model
{
    public class UserSetting
    {
        public long UserId { get; set; }

        public string Name { get; set; }
        public int SettingId { get; set; }

        public bool SettingValue { get; set; }

        public long? CreatedBy { get; set; }

        public DateTime? CreatedDate { get; set; }

        public long? ModifiedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public bool Active { get; set; }
    }
}