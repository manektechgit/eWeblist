using EWebList.DataRepository.Model;
using EWebList.DataRepository.ViewModel;
using System.Collections.Generic;

namespace EWebList.Business.Abstract
{
    public interface IDirectoryClickDetailBusiness
    {
        int InsertDirectoryClick(DirectoryClickDetail directoryClickDetail);

        IEnumerable<SiteTotalClicksResponse> GetSiteClickDetails(SiteTotalChartDataRequest siteTotalChartDataRequest);

        IEnumerable<SiteTotalClicksResponse> GetDirectoryPublishData(SiteTotalChartDataRequest siteTotalChartDataRequest);
    }
}