using EWebList.Business.Abstract;
using EWebList.DataRepository.Abstract;
using EWebList.DataRepository.Model;
using System.Collections.Generic;

namespace EWebList.Business.Concrete
{
    public class DirectoryPlanDetailsBusiness : IDirectoryPlanDetailsBusiness
    {
        private readonly IDirectoryPlanDetailsRepository _directoryPlanDetailsRepository;

        public DirectoryPlanDetailsBusiness(IDirectoryPlanDetailsRepository directoryPlanDetailsRepository)
        {
            _directoryPlanDetailsRepository = directoryPlanDetailsRepository;
        }

        public IEnumerable<DirectoryPlanDetails> GetUserDirectoryPlan(long userId)
        {
            return _directoryPlanDetailsRepository.GetUserDirectoryPlan(userId);
        }

        public int InsertDirectoryPlanDetail(DirectoryPlanDetails directoryPlanDetailsModel)
        {
            return _directoryPlanDetailsRepository.InsertDirectoryPlanDetail(directoryPlanDetailsModel);
        }
    }
}