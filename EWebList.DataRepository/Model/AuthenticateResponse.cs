namespace EWebList.DataRepository.Model
{
    public class AuthenticateResponse
    {
        public long UserId { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Title { get; set; }
        public string RegistrationName { get; set; }
        public string ProfilePicture { get; set; }
        public string ContactNo { get; set; }
        public int RoleId { get; set; }
        public bool IsActive { get; set; }
        public string JwtToken { get; set; }
    }
}