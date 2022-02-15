namespace EWebList.DataRepository.Model
{
    public class NonRegisteredDirectoryResponse
    {
        public bool IsNewUser { get; set; }
        public bool IsApproved { get; set; }
        public long UserId { get; set; }
        public int DirectoryId { get; set; }
    }
}