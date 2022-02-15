using EWebList.Business.Abstract;
using EWebList.Common;
using EWebList.DataRepository.Abstract;
using EWebList.DataRepository.Model;
using System.Collections.Generic;

namespace EWebList.Business.Concrete
{
    public class UserMasterBusiness : IUserMasterBusiness
    {
        private readonly IUserMasterRepository _userMasterRepository;
        private readonly Email _email;

        public UserMasterBusiness(IUserMasterRepository userMasterRepository, Email email)
        {
            _userMasterRepository = userMasterRepository;
            _email = email;
        }

        public AuthenticateResponse AuthenticateUser(AuthenticateRequest authenticateRequest)
        {
            authenticateRequest.Password = CrptographyEngine.Encrypt(authenticateRequest.Password);
            var result = _userMasterRepository.AuthenticateUser(authenticateRequest);
            if (result != null)
            {
                result.Password = CrptographyEngine.Decrypt(result.Password);
            }
            return result;
        }

        public bool ForgetPasswordAndEmail(string EmailId)
        {
            var user = _userMasterRepository.GetUserDetailByEmail(EmailId);
            if (user == null)
            {
                return false;
            }
            else if (user.IsActive == false)
            {
                return false;
            }
            else
            {
                _email.ForgetPasswordMail(user);
                return true;
            }
        }

        public IEnumerable<UserMaster> GetAllUsers()
        {
            return _userMasterRepository.GetAllUsers();
        }

        public UserMaster GetUserDetailByEmail(string emailId)
        {
            return _userMasterRepository.GetUserDetailByEmail(emailId);
        }

        public UserMaster GetUserDetailById(long userId)
        {
            var result = _userMasterRepository.GetUserDetailById(userId);
            if (result != null)
            {
                result.Password = CrptographyEngine.Decrypt(result.Password);
            }
            return result;
        }

        public int UpdateUserMaster(UserMaster userMaster)
        {
            userMaster.Password = CrptographyEngine.Encrypt(userMaster.Password);
            return _userMasterRepository.UpdateUserMaster(userMaster);
        }

        public string ResetPassword(UserMaster userMaster)
        {
            userMaster.Password = CrptographyEngine.Encrypt(userMaster.Password);
            var result = _userMasterRepository.ResetPassword(userMaster);
            _email.PasswordChangeSucessMail(userMaster);
            return result;
        }

        public int ActiveDeactiveUser(UserMaster userMaster)
        {
            return _userMasterRepository.ActiveDeactiveUser(userMaster);
        }

        public int GetTotalActiveUsers()
        {
            return _userMasterRepository.GetTotalActiveUsers();
        }

        public bool ResetPasswordNewUser(UserMaster userMaster)
        {
            userMaster.Password = CrptographyEngine.Encrypt(userMaster.Password);
            var result = _userMasterRepository.ResetPasswordNewUser(userMaster);
            _email.PasswordChangeSucessMail(userMaster);
            return result;
        }
    }
}