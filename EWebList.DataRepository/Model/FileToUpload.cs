namespace EWebList.DataRepository.Model
{
    public class FileToUpload
    {
        public string fileName { get; set; }
        public string fileSize { get; set; }
        public string fileType { get; set; }
        public string fileAsBase64 { get; set; }
        public byte[] FileAsByteArray { get; set; }
    }
}