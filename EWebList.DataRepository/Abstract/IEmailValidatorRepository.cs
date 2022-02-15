namespace EWebList.DataRepository.Abstract
{
    public interface IEmailValidatorRepository
    {
        bool VerifyEmail(string emailId);
    }
}