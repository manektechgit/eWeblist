using EWebList.DataRepository.Model;
using System.Collections.Generic;

namespace EWebList.Business.Abstract
{
    public interface IDirectoryPlanDetailsBusiness
    {
        int InsertDirectoryPlanDetail(DirectoryPlanDetails directoryPlanDetailsModel);

        IEnumerable<DirectoryPlanDetails> GetUserDirectoryPlan(long userId);
    }
}