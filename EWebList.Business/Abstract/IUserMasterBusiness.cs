using EWebList.DataRepository.Model;
using System.Collections.Generic;

namespace EWebList.Business.Abstract
{
    public interface IUserMasterBusiness
    {
        IEnumerable<UserMaster> GetAllUsers();

        UserMaster GetUserDetailById(long userId);

        AuthenticateResponse AuthenticateUser(AuthenticateRequest authenticateRequest);

        int UpdateUserMaster(UserMaster userMaster);

        UserMaster GetUserDetailByEmail(string emailId);

        bool ForgetPasswordAndEmail(string EmailId);

        string ResetPassword(UserMaster userMaster);

        bool ResetPasswordNewUser(UserMaster userMaster);

        int ActiveDeactiveUser(UserMaster userMaster);

        int GetTotalActiveUsers();
    }
}