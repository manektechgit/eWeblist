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
    public class DirectoryPlanDetailsRepository : IDirectoryPlanDetailsRepository
    {
        public IConfiguration _configuration { get; }

        public DirectoryPlanDetailsRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public int InsertDirectoryPlanDetail(Model.DirectoryPlanDetails directoryPlanDetailsModel)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DirectoryId", directoryPlanDetailsModel.DirectoryId);
                parameters.Add("@UserId", directoryPlanDetailsModel.UserId);
                parameters.Add("@IsPremimun", directoryPlanDetailsModel.IsPremimun);
                parameters.Add("@PaypalResponse", directoryPlanDetailsModel.PaypalResponse);
                return Convert.ToInt32(con.ExecuteScalar("InsertDirectoryPlan", param: parameters, commandType: CommandType.StoredProcedure));
            }
        }

        public IEnumerable<DirectoryPlanDetails> GetUserDirectoryPlan(long userId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", userId);
                var result = SqlMapper.Query<DirectoryPlanDetails>(con, "UserDirectoryPlan_GET", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }
    }
}