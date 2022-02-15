using Dapper;
using EWebList.DataRepository.Abstract;
using EWebList.DataRepository.Model;
using EWebList.DataRepository.ViewModel;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace EWebList.DataRepository.Concrete
{
    public class DirectoryClickDetailRepository : IDirectoryClickDetailRepository
    {
        private IConfiguration _configuration { get; }

        public DirectoryClickDetailRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public int InsertDirectoryClick(DirectoryClickDetail directoryClickDetail)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DirectoryId", directoryClickDetail.DirectoryId);
                parameters.Add("@UserId", directoryClickDetail.UserId);
                var result = Convert.ToInt32(con.ExecuteScalar("InsertDirectoryClick", param: parameters, commandType: CommandType.StoredProcedure));
                con.Close();
                return result;
            }
        }

        public IEnumerable<SiteTotalClicksResponse> GetSiteClickDetails(SiteTotalChartDataRequest siteTotalChartDataRequest)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@FilterBy", siteTotalChartDataRequest.FilterBy);
                parameters.Add("@UserId", siteTotalChartDataRequest.UserId);
                var result = SqlMapper.Query<SiteTotalClicksResponse>(con, "GetDirectoryClickDataByUser", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public IEnumerable<SiteTotalClicksResponse> GetDirectoryPublishData(SiteTotalChartDataRequest siteTotalChartDataRequest)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@FilterBy", siteTotalChartDataRequest.FilterBy);
                var result = SqlMapper.Query<SiteTotalClicksResponse>(con, "GetDirectorySubmittedData", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }
    }
}