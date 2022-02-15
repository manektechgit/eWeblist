using EWebList.Business.Abstract;
using EWebList.DataRepository.Abstract;
using EWebList.DataRepository.Model;
using System.Collections.Generic;

namespace EWebList.Business.Concrete
{
    public class UserSettingBusiness : IUserSettingBusiness
    {
        private readonly IUserSettingRepository _userSettingRepository;

        public UserSettingBusiness(IUserSettingRepository userSettingRepository)
        {
            _userSettingRepository = userSettingRepository;
        }

        public IEnumerable<UserSetting> GetUserSetting(long userId)
        {
            return _userSettingRepository.GetUserSetting(userId);
        }

        public int UpdateUserSetting(UserSetting userSetting)
        {
            return _userSettingRepository.UpdateUserSetting(userSetting);
        }
    }
}