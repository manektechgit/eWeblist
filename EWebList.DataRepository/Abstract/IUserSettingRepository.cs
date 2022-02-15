using EWebList.DataRepository.Model;
using System.Collections.Generic;

namespace EWebList.DataRepository.Abstract
{
    public interface IUserSettingRepository
    {
        IEnumerable<UserSetting> GetUserSetting(long userId);

        int UpdateUserSetting(UserSetting userSetting);
    }
}