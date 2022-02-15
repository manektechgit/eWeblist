using System;

namespace EWebList.DataRepository.Model
{
    public class DirectoryPlanDetails
    {
        public int? PlanId { get; set; }

        public int DirectoryId { get; set; }

        public long UserId { get; set; }

        public bool IsPremimun { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public DateTime CreatedDate { get; set; }

        public string PaypalResponse { get; set; }
    }
}