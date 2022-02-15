namespace EWebList.DataRepository.Model
{
    public class EmailSettings
    {
        public string ServerName { get; set; }
        public string Port { get; set; }
        public string UserName { get; set; }
        public string MailFrom { get; set; }
        public string Password { get; set; }
        public bool EnableSsl { get; set; }
        public string EmailTemplate { get; set; }
        public string MailSignatureName { get; set; }
        public string AdminEmail { get; set; }
        public string DisplayName { get; set; }
    }
}