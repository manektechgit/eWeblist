using EWebList.Business.Abstract;
using EWebList.DataRepository.Abstract;

namespace EWebList.Business.Concrete
{
    public class EmailValidatorBusiness : IEmailValidatorBusiness
    {
        private readonly IEmailValidatorRepository _emailValidatorRepository;

        public EmailValidatorBusiness(IEmailValidatorRepository emailValidatorRepository)
        {
            _emailValidatorRepository = emailValidatorRepository;
        }

        public bool VerifyEmail(string emailId)
        {
            return _emailValidatorRepository.VerifyEmail(emailId);
        }
    }
}