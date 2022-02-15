namespace EWebList.DataRepository.ViewModel
{
    public class SiteTotalChartDataRequest
    {
        public string FilterBy { get; set; }
        public long? UserId { get; set; }
    }

    public class SiteTotalClicksResponse
    {
        public string DateData { get; set; }
        public long TotalCount { get; set; }
    }
}