using EWebList.DataRepository.Model;
using System.Collections.Generic;

namespace EWebList.DataRepository.Abstract
{
    public interface IDirectoryPlanDetailsRepository
    {
        int InsertDirectoryPlanDetail(DirectoryPlanDetails directoryPlanDetailsModel);

        IEnumerable<DirectoryPlanDetails> GetUserDirectoryPlan(long userId);
    }
}