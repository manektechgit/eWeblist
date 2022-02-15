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
    public class SubCategoryMasterRepository : ISubCategoryMasterRepository
    {
        public IConfiguration _configuration { get; }
        private readonly IGeneralGenericFunction _generalGenericFunction;

        public SubCategoryMasterRepository(IConfiguration configuration, IGeneralGenericFunction generalGenericFunction)
        {
            _configuration = configuration;
            _generalGenericFunction = generalGenericFunction;
        }

        public IEnumerable<SubCategoryMaster> GetAllSubCategory()
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                return SqlMapper.Query<SubCategoryMaster>(con, "GetAllSubCategory", null, commandType: CommandType.StoredProcedure);
            }
        }

        public IEnumerable<SubCategoryMaster> GetAllSubCategoryByCategory(int categoryId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CategoryId", categoryId);
                return SqlMapper.Query<SubCategoryMaster>(con, "GetAllSubCategoryByCategory", param: parameters, commandType: CommandType.StoredProcedure);
            }
        }

        public IEnumerable<SubCategoryVM> GetSubCategoryTotalDirectoryByCategory(int categoryId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CategoryId", categoryId);
                return SqlMapper.Query<SubCategoryVM>(con, "GetSubCategoryTotalDirectoryByCategory", param: parameters, commandType: CommandType.StoredProcedure);
            }
        }

        public int InsertSubCategoryMaster(SubCategoryMaster subCategoryMaster)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CategoryId", subCategoryMaster.CategoryId);
                parameters.Add("@Name", subCategoryMaster.Name);
                parameters.Add("@IconName", subCategoryMaster.IconName);
                parameters.Add("@CreatedBy", subCategoryMaster.CreatedBy);
                parameters.Add("@IsActive", subCategoryMaster.IsActive);
                return Convert.ToInt32(con.ExecuteScalar("InsertSubCategoryMaster", param: parameters, commandType: CommandType.StoredProcedure));
            }
        }

        public SubCategoryMaster SubCategoryByName(int categoryId, string name)
        {
            string where = "CategoryId='" + categoryId + "' and  SlugName = '" + name.ToLower() + "' And ";
            return _generalGenericFunction.GetField<SubCategoryMaster>(where, "SubCategoryMaster", "SubCategoryId");
        }

        public int UpdateSubCategoryMaster(SubCategoryMaster subCategoryMaster)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@SubCategoryId", subCategoryMaster.SubCategoryId);
                parameters.Add("@CategoryId", subCategoryMaster.CategoryId);
                parameters.Add("@Name", subCategoryMaster.Name);
                parameters.Add("@IconName", subCategoryMaster.IconName);
                parameters.Add("@ModifiedBy", subCategoryMaster.ModifiedBy);
                parameters.Add("@IsActive", subCategoryMaster.IsActive);
                return Convert.ToInt32(con.ExecuteScalar("UpdateSubCategoryMaster", param: parameters, commandType: CommandType.StoredProcedure));
            }
        }
    }
}