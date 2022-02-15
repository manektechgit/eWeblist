using EWebList.DataRepository.Model;
using System.Collections.Generic;

namespace EWebList.Business.Abstract
{
    public interface IUserSettingBusiness
    {
        IEnumerable<UserSetting> GetUserSetting(long userId);

        int UpdateUserSetting(UserSetting userSetting);
    }
}