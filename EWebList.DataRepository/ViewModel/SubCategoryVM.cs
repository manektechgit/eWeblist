namespace EWebList.DataRepository.ViewModel
{
    public class SubCategoryVM
    {
        public int? CategoryId { get; set; }
        public int? SubCategoryId { get; set; }

        public string Name { get; set; }

        public string IconName { get; set; }

        public int TotalDirectory { get; set; }
        public string SlugName { get; set; }

    }
}