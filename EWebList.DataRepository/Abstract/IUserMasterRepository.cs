using EWebList.DataRepository.Model;
using System.Collections.Generic;

namespace EWebList.DataRepository.Abstract
{
    public interface IUserMasterRepository
    {
        int ActiveDeactiveUser(UserMaster userMaster);

        AuthenticateResponse AuthenticateUser(AuthenticateRequest authenticateRequest);

        IEnumerable<UserMaster> GetAllUsers();

        int GetTotalActiveUsers();

        UserMaster GetUserDetailByEmail(string emailId);

        UserMaster GetUserDetailById(long userId);

        long InsertUserMaster(UserMaster userMaster);

        string ResetPassword(UserMaster userMaster);

        bool ResetPasswordNewUser(UserMaster userMaster);

        int UpdateUserMaster(UserMaster userMaster);
    }
}