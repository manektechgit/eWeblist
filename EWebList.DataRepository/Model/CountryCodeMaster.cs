using System;

namespace EWebList.DataRepository.Model
{
    public class CountryCodeMaster
    {
        public string CountryCode { get; set; }

        public string Name { get; set; }
        public string AlphaCode { get; set; }

        public DateTime? CreatedDate { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public bool? Active { get; set; }
    }
}