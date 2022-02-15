using Dapper;
using EWebList.DataRepository.Abstract;
using EWebList.DataRepository.Constants;
using EWebList.DataRepository.Model;
using EWebList.DataRepository.ViewModel;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace EWebList.DataRepository.Concrete
{
    public class DirectoryMasterRepository : IDirectoryMasterRepository
    {
        private readonly IGeneralGenericFunction _generalGenericFunction;
        private readonly IUserMasterRepository _userMasterRepository;

        public DirectoryMasterRepository(IConfiguration configuration, IUserMasterRepository userMasterRepository, IGeneralGenericFunction generalGenericFunction)
        {
            _configuration = configuration;
            _userMasterRepository = userMasterRepository;
            _generalGenericFunction = generalGenericFunction;
        }

        private IConfiguration _configuration { get; }

        public int DeleteDirectory(DirectoryMaster directoryMaster)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DirectoryId", directoryMaster.DirectoryId);
                parameters.Add("@UserId", directoryMaster.UserId);
                parameters.Add("@TypeId", StatusType.Site);
                parameters.Add("@TypeStatusId", StatusType.Delete);
                var result = Convert.ToInt32(con.ExecuteScalar("DeleteDirectory", param: parameters, commandType: CommandType.StoredProcedure));
                con.Close();
                return result;
            }
        }

        public IEnumerable<DirectoryMaster> GetAllDirectory(PaginationModel paginationModel)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@iDisplayLength", paginationModel.DisplayLength);
                parameters.Add("@iDisplayStart", paginationModel.DisplayStart);
                parameters.Add("@sSearch", paginationModel.Search);
                parameters.Add("@iSortCol", paginationModel.SortCol);
                parameters.Add("@sSortDir", paginationModel.SortDir);
                parameters.Add("@iUserId", paginationModel.UserId);
                parameters.Add("@iCategoryId", paginationModel.CategoryId);
                parameters.Add("@iSubCategoryId", paginationModel.SubCategoryId);
                var result = SqlMapper.Query<DirectoryMaster>(con, "DirectoryDataTable", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public IEnumerable<DirectoryMaster> GetDirectoryByDirectoryId(int directoryId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DirectoryId", directoryId);
                var result = SqlMapper.Query<DirectoryMaster>(con, "DirectoryByDirectoryId_GET", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public IEnumerable<DirectoryMaster> GetDirectoryByUser(long userId)
        {
            string where = " UserId = '" + userId + "' And IsDeleted = 0  And IsActive = 1  And ";
            return _generalGenericFunction.GetAllField<DirectoryMaster>(where, "DirectoryMaster", "BusinessName");
        }

        public IEnumerable<DirectoryMaster> GetDirectoryFilterby(int categoryId)
        {
            string where = " CategoryId = '" + categoryId + "' And IsDeleted = 0  And IsActive = 1  And ";
            return _generalGenericFunction.GetAllField<DirectoryMaster>(where, "DirectoryMaster", "BusinessName");
        }

        public IEnumerable<DirectoryMaster> GetDirectoryFilterby(int categoryId, string searchText)
        {
            string where = " CategoryId = '" + categoryId + "' And IsDeleted = 0 And IsActive = 1   And BusinessName like  '%" + searchText.ToLower() + "%'  And ";
            return _generalGenericFunction.GetAllField<DirectoryMaster>(where, "DirectoryMaster", "BusinessName");
        }

        public int GetTotalDirectory()
        {
            string where = " IsDeleted = 0 And IsActive = 1 ";
            return _generalGenericFunction.GetTotalCount(where, "DirectoryMaster", "DirectoryId");
        }

        public NonRegisteredDirectoryResponse InsertDirectoryNonRegisterUser(DirectoryVsUserVM directoryVsUserVM)
        {
            NonRegisteredDirectoryResponse nonRegisteredDirectoryResponse = new NonRegisteredDirectoryResponse();
            var user = _userMasterRepository.GetUserDetailByEmail(directoryVsUserVM.userMaster.Email);
            long userId = 0;
            if (user == null)
            {
                userId = _userMasterRepository.InsertUserMaster(directoryVsUserVM.userMaster);
                directoryVsUserVM.directoryMaster.UserId = userId;
                directoryVsUserVM.userMaster.UserId = userId;
                var directoryId = InsertDirectory(directoryVsUserVM.directoryMaster);

                //response for new user
                nonRegisteredDirectoryResponse.UserId = userId;
                nonRegisteredDirectoryResponse.IsApproved = false;
                nonRegisteredDirectoryResponse.IsNewUser = true;
                nonRegisteredDirectoryResponse.DirectoryId = directoryId;
                return nonRegisteredDirectoryResponse;
            }
            else
            {
                // if user is existing user and is not approved we will no allow hing to add directory
                if (user.IsApproved)
                {
                    userId = user.UserId;
                    directoryVsUserVM.directoryMaster.UserId = userId;
                    directoryVsUserVM.userMaster.UserId = userId;
                    UpdateUser(directoryVsUserVM, user);
                    var directoryId = InsertDirectory(directoryVsUserVM.directoryMaster);
                    //return user detail
                    nonRegisteredDirectoryResponse.UserId = user.UserId;
                    nonRegisteredDirectoryResponse.IsApproved = user.IsApproved;
                    nonRegisteredDirectoryResponse.IsNewUser = false;
                    nonRegisteredDirectoryResponse.DirectoryId = directoryId;
                    return nonRegisteredDirectoryResponse;
                }
                else
                {
                    directoryVsUserVM.directoryMaster.UserId = userId;
                    directoryVsUserVM.userMaster.UserId = userId;
                    nonRegisteredDirectoryResponse.UserId = user.UserId;
                    nonRegisteredDirectoryResponse.IsApproved = user.IsApproved;
                    nonRegisteredDirectoryResponse.IsNewUser = false;
                    nonRegisteredDirectoryResponse.DirectoryId = 0;
                    return nonRegisteredDirectoryResponse;
                }
            }
        }

        public int InsertDirectoryRegisterUser(DirectoryMaster directoryMaster)
        {
            return InsertDirectory(directoryMaster);
        }

        public bool IsWebsiteExist(DirectoryMaster directoryMaster)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DirectoryId", (directoryMaster.DirectoryId == null ? 0 : directoryMaster.DirectoryId));
                parameters.Add("@WebsiteUrl", directoryMaster.WebsiteUrl);
                var result = Convert.ToBoolean(con.ExecuteScalar("WebsiteExist", param: parameters, commandType: CommandType.StoredProcedure));
                con.Close();
                return result;
            }
        }

        public IEnumerable<DirectoryMaster> MySites(long userId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", userId);
                var result = SqlMapper.Query<DirectoryMaster>(con, "DirectoryMySite_GET", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public int UpdateDirectory(DirectoryMaster directoryMaster)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DirectoryId", directoryMaster.DirectoryId);
                parameters.Add("@CategoryId", directoryMaster.CategoryId);
                parameters.Add("@SubCategoryId", directoryMaster.SubCategoryId);
                parameters.Add("@BusinessName", directoryMaster.BusinessName);
                parameters.Add("@WebsiteUrl", directoryMaster.WebsiteUrl);
                parameters.Add("@Logo", directoryMaster.Logo);
                parameters.Add("@ListingHeadline", directoryMaster.ListingHeadline);
                parameters.Add("@Keywords", directoryMaster.Keywords.ToLower());
                parameters.Add("@Description", directoryMaster.Description);
                parameters.Add("@UserId", directoryMaster.UserId);
                parameters.Add("@IsDeleted", directoryMaster.IsDeleted);
                parameters.Add("@IsActive", directoryMaster.IsActive);
                var result = Convert.ToInt32(con.ExecuteScalar("UpdateDirectory", param: parameters, commandType: CommandType.StoredProcedure));
                con.Close();
                return result;
            }
        }

        public bool UpdateLogo(int directoryId, string logoName)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DirectoryId", directoryId);
                parameters.Add("@Logo", logoName);
                var result = con.ExecuteScalar("UpdateDirectoryLogo", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return true;
            }
        }

        private int InsertDirectory(DirectoryMaster directoryMaster)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CategoryId", directoryMaster.CategoryId);
                parameters.Add("@SubCategoryId", directoryMaster.SubCategoryId);
                parameters.Add("@BusinessName", directoryMaster.BusinessName);
                parameters.Add("@WebsiteUrl", directoryMaster.WebsiteUrl);
                parameters.Add("@Logo", directoryMaster.Logo);
                parameters.Add("@ListingHeadline", directoryMaster.ListingHeadline);
                parameters.Add("@Keywords", directoryMaster.Keywords.ToLower());
                parameters.Add("@Description", directoryMaster.Description);
                parameters.Add("@UserId", directoryMaster.UserId);
                parameters.Add("@IsDeleted", directoryMaster.IsDeleted);
                var result = Convert.ToInt32(con.ExecuteScalar("InsertDirectory", param: parameters, commandType: CommandType.StoredProcedure));
                con.Close();
                return result;
            }
        }

        private void UpdateUser(DirectoryVsUserVM directoryVsUserVM, Model.UserMaster user)
        {
            //user.Password = directoryVsUserVM.userMaster.Password;
            user.Title = directoryVsUserVM.userMaster.Title;
            user.RegistrationName = directoryVsUserVM.userMaster.RegistrationName;
            user.ContactNo = directoryVsUserVM.userMaster.ContactNo;
            user.CountryCode = directoryVsUserVM.userMaster.CountryCode;
            _userMasterRepository.UpdateUserMaster(user);
        }


        public DirectoryVsUserVM GetUserAndDirectoryPlanDetails()
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            DirectoryVsUserVM directoryVsUserVM = new DirectoryVsUserVM();
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                var result = con.QueryMultiple("GetUserAndDirectoryPlanDetails", commandType: CommandType.StoredProcedure);
                directoryVsUserVM.directoryMasterVM = result.Read<DirectoryMaster>();
                directoryVsUserVM.userMasterVM = result.Read<UserMaster>();
                con.Close();
                return directoryVsUserVM;
            }
        }
        
        public DirectoryVsUserVM GetTodaysCreatedDirectoryDetails()
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            DirectoryVsUserVM directoryVsUserVM = new DirectoryVsUserVM();
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                var result = con.QueryMultiple("GetTodaysCreatedDirectoryDetails", commandType: CommandType.StoredProcedure);
                directoryVsUserVM.directoryMasterVM = result.Read<DirectoryMaster>();
                con.Close();
                return directoryVsUserVM;
            }
        }

        public DirectoryVsUserVM GetTomorrowExpireDirectoryDetails()
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            DirectoryVsUserVM directoryVsUserVM = new DirectoryVsUserVM();
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                var result = con.QueryMultiple("GetTomorrowExpireDirectoryDetails", commandType: CommandType.StoredProcedure);
                directoryVsUserVM.directoryMasterVM = result.Read<DirectoryMaster>();
                directoryVsUserVM.userMasterVM = result.Read<UserMaster>();
                con.Close();
                return directoryVsUserVM;
            }
        }

    }
}