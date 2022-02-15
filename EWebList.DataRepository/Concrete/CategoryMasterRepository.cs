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
    public class CategoryMasterRepository : ICategoryMasterRepository
    {
        private readonly IGeneralGenericFunction _generalGenericFunction;
        public IConfiguration _configuration { get; }

        public CategoryMasterRepository(IConfiguration configuration, IGeneralGenericFunction generalGenericFunction)
        {
            _configuration = configuration;
            _generalGenericFunction = generalGenericFunction;
        }

        public IEnumerable<CategoryMaster> GetAllCategory()
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                return SqlMapper.Query<CategoryMaster>(con, "GetAllCategory", null, commandType: CommandType.StoredProcedure);
            }
        }

        public IEnumerable<CategoryVM> GetAllCategoryDetailWithTotalDirectory()
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                return SqlMapper.Query<CategoryVM>(con, "GetAllCategoryDetailWithTotalDirectory", null, commandType: CommandType.StoredProcedure);
            }
        }

        public CategoryMaster CategoryByName(string name)
        {
            string where = " SlugName = '" + name.ToLower() + "' And ";
            return _generalGenericFunction.GetField<CategoryMaster>(where, "CategoryMaster", "CategoryId");
        }

        public IEnumerable<CategoryVM> GetCategoryByTotalDirectoryUser(long userId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", userId);
                return SqlMapper.Query<CategoryVM>(con, "GetCategoryByTotalDirectoryUser", param: parameters, commandType: CommandType.StoredProcedure);
            }
        }

        public CategorySubCategoryVM GetCategorySubCategoryAlphabatically(string alphabet)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            CategorySubCategoryVM categorySubCategoryVM = new CategorySubCategoryVM();
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Alphabet", alphabet.Trim());
                var result = con.QueryMultiple("GetCategorySubCategoryAlphabatically", param: parameters, commandType: CommandType.StoredProcedure);
                categorySubCategoryVM.categoryVM = result.Read<CategoryVM>();
                categorySubCategoryVM.subCategoryVM = result.Read<SubCategoryVM>();
                con.Close();
                return categorySubCategoryVM;
            }
        }

        public int GetTotalCategory()
        {
            string where = " IsActive = 1 ";
            return _generalGenericFunction.GetTotalCount(where, "CategoryMaster", "CategoryId");
        }

        public int InsertCategoryMaster(CategoryMaster categoryMaster)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Name", categoryMaster.Name);
                parameters.Add("@IconName", categoryMaster.IconName);
                parameters.Add("@CreatedBy", categoryMaster.CreatedBy);
                parameters.Add("@IsActive", categoryMaster.IsActive);
                return Convert.ToInt32(con.ExecuteScalar("InsertCategoryMaster", param: parameters, commandType: CommandType.StoredProcedure));
            }
        }

        public int UpdateCategoryMaster(CategoryMaster categoryMaster)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CategoryId", categoryMaster.CategoryId);
                parameters.Add("@Name", categoryMaster.Name);
                parameters.Add("@IconName", categoryMaster.IconName);
                parameters.Add("@ModifyBy", categoryMaster.ModifyBy);
                parameters.Add("@IsActive", categoryMaster.IsActive);
                return Convert.ToInt32(con.ExecuteScalar("UpdateCategoryMaster", param: parameters, commandType: CommandType.StoredProcedure));
            }
        }
    }
}