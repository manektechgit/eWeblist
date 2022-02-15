using Dapper;
using EWebList.DataRepository.Abstract;
using EWebList.DataRepository.Model;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace EWebList.DataRepository.Concrete
{
    public class CountryCodeRepository : ICountryCodeRepository
    {
        public IConfiguration _configuration { get; }

        public CountryCodeRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IEnumerable<CountryCodeMaster> GetAllCountryCodes()
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                return SqlMapper.Query<CountryCodeMaster>(con, "GetAllCountryCodes", null, commandType: CommandType.StoredProcedure);
            }
        }
    }
}