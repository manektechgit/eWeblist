using Dapper;
using EWebList.DataRepository.Abstract;
using EWebList.DataRepository.Model;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace EWebList.DataRepository.Concrete
{
    public class UserSettingRepository : IUserSettingRepository
    {
        public IConfiguration _configuration { get; }

        public UserSettingRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IEnumerable<UserSetting> GetUserSetting(long userId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", userId);
                var result = SqlMapper.Query<UserSetting>(con, "GetUserSetting", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public int UpdateUserSetting(UserSetting userSetting)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", userSetting.UserId);
                parameters.Add("@SettingId", userSetting.SettingId);
                parameters.Add("@SettingValue", userSetting.SettingValue);
                var result = Convert.ToInt32(con.ExecuteScalar("UpdateUserSetting", param: parameters, commandType: CommandType.StoredProcedure));
                con.Close();
                return result;
            }
        }
    }
}