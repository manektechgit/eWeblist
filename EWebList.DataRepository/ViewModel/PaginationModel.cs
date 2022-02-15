namespace EWebList.DataRepository.ViewModel
{
    public class PaginationModel
    {
        public int DisplayLength { get; set; }
        public int DisplayStart { get; set; }
        public string Search { get; set; }
        public string SortCol { get; set; }
        public string SortDir { get; set; }
        public long UserId { get; set; }
        public int CategoryId { get; set; }
        public int? SubCategoryId { get; set; }
    }
}