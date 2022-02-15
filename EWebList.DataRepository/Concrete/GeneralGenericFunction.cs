using Dapper;
using EWebList.DataRepository.Abstract;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace EWebList.DataRepository.Concrete
{
    public class GeneralGenericFunction : IGeneralGenericFunction
    {
        public IConfiguration _configuration { get; }

        public GeneralGenericFunction(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public T GetField<T>(string pWhere, string pTablename, string pfilterColoumn)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TableName", pTablename);
                parameters.Add("@WhereClause", pWhere);
                parameters.Add("@FilterColumn", pfilterColoumn);
                parameters.Add("@FilterText", "");
                var result = SqlMapper.Query<T>(con, "spGetAllField", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                con.Close();
                return result;
            }
        }

        public IEnumerable<T> GetAllField<T>(string pWhere, string pTablename, string pfilterColoumn)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TableName", pTablename);
                parameters.Add("@WhereClause", pWhere);
                parameters.Add("@FilterColumn", pfilterColoumn);
                parameters.Add("@FilterText", "");
                var result = SqlMapper.Query<T>(con, "spGetAllField", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        /// <summary>This will execute any store procedure
        /// <param name="procName">store procedure name.</param>
        /// <param name="parameters">parameters of the store procedure.</param>
        /// </summary>
        public T ExecuteProcedure<T>(string procName, params DynamicParameters[] parameters)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                var result = SqlMapper.Query<T>(con, procName, param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault(); ;
                con.Close();
                return result;
            }
        }

        /// <summary>This Method Give Count Of Any table
        /// </summary>
        /// <param name="pWhere">sql where clause.</param>
        /// <param name="pTablename">name of the table.</param>
        /// <param name="pfilterColoumn">primary key coloumn name.</param>
        public int GetTotalCount(string pWhere, string pTablename, string pColoumn)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TableName", pTablename);
                parameters.Add("@WhereClause", pWhere);
                parameters.Add("@FilterColumn", pColoumn);
                var result = Convert.ToInt32(con.ExecuteScalar("spGetTableDataCount", param: parameters, commandType: CommandType.StoredProcedure));
                con.Close();
                return result;
            }
        }
    }
}