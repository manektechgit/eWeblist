using Dapper;
using EWebList.DataRepository.Abstract;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;

namespace EWebList.DataRepository.Concrete
{
    public class EmailSubscriptionRepository : IEmailSubscriptionRepository
    {
        public IConfiguration _configuration { get; }

        public EmailSubscriptionRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public int InsertEmailSubscription(string emailId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Email", emailId);
                return Convert.ToInt32(con.ExecuteScalar("InsertEmailSubscription", param: parameters, commandType: CommandType.StoredProcedure));
            }
        }
    }
}