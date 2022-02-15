using EWebList.DataRepository.Model;
using EWebList.DataRepository.ViewModel;
using System.Collections.Generic;

namespace EWebList.DataRepository.Abstract
{
    public interface IDirectoryClickDetailRepository
    {
        int InsertDirectoryClick(DirectoryClickDetail directoryClickDetail);

        IEnumerable<SiteTotalClicksResponse> GetSiteClickDetails(SiteTotalChartDataRequest siteTotalChartDataRequest);

        IEnumerable<SiteTotalClicksResponse> GetDirectoryPublishData(SiteTotalChartDataRequest siteTotalChartDataRequest);
    }
}