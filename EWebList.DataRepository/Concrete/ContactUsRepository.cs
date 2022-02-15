using Dapper;
using EWebList.DataRepository.Abstract;
using EWebList.DataRepository.Model;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;

namespace EWebList.DataRepository.Concrete
{
    public class ContactUsRepository : IContactUsRepository
    {
        public IConfiguration _configuration { get; }

        public ContactUsRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public int InsertContactInfo(ContactUs contactUs)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@SubjectId", contactUs.SubjectId);
                parameters.Add("@Name", contactUs.Name);
                parameters.Add("@Email", contactUs.Email);
                parameters.Add("@Link", contactUs.Link);
                parameters.Add("@Message", contactUs.Message);
                var result = Convert.ToInt32(con.ExecuteScalar("InsertContactUs", param: parameters, commandType: CommandType.StoredProcedure));
                con.Close();
                return result;
            }
        }
    }
}