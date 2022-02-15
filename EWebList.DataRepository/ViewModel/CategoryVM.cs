namespace EWebList.DataRepository.ViewModel
{
    public class CategoryVM
    {
        public int? CategoryId { get; set; }

        public string Name { get; set; }

        public string IconName { get; set; }

        public int TotalDirectory { get; set; }
        public string SlugName { get; set; }
    }
}