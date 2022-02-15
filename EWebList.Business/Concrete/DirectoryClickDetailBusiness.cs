using EWebList.Business.Abstract;
using EWebList.DataRepository.Abstract;
using EWebList.DataRepository.Model;
using EWebList.DataRepository.ViewModel;
using System.Collections.Generic;

namespace EWebList.Business.Concrete
{
    public class DirectoryClickDetailBusiness : IDirectoryClickDetailBusiness
    {
        private readonly IDirectoryClickDetailRepository _directoryClickDetailRepository;

        public DirectoryClickDetailBusiness(IDirectoryClickDetailRepository directoryClickDetailRepository)
        {
            _directoryClickDetailRepository = directoryClickDetailRepository;
        }

        public IEnumerable<SiteTotalClicksResponse> GetDirectoryPublishData(SiteTotalChartDataRequest siteTotalChartDataRequest)
        {
            return _directoryClickDetailRepository.GetDirectoryPublishData(siteTotalChartDataRequest);
        }

        public IEnumerable<SiteTotalClicksResponse> GetSiteClickDetails(SiteTotalChartDataRequest siteTotalChartDataRequest)
        {
            return _directoryClickDetailRepository.GetSiteClickDetails(siteTotalChartDataRequest);
        }

        public int InsertDirectoryClick(DirectoryClickDetail directoryClickDetail)
        {
            return _directoryClickDetailRepository.InsertDirectoryClick(directoryClickDetail);
        }
    }
}