using Dapper;
using EWebList.DataRepository.Abstract;
using EWebList.DataRepository.Constants;
using EWebList.DataRepository.Model;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace EWebList.DataRepository.Concrete
{
    public class UserMasterRepository : IUserMasterRepository
    {
        private readonly IGeneralGenericFunction _generalGenericFunction;

        public UserMasterRepository(IConfiguration configuration, IGeneralGenericFunction generalGenericFunction)
        {
            _configuration = configuration;
            _generalGenericFunction = generalGenericFunction;
        }

        public IConfiguration _configuration { get; }

        public int ActiveDeactiveUser(UserMaster userMaster)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", userMaster.UserId);
                parameters.Add("@IsActive", userMaster.IsActive);
                parameters.Add("@ModifiedBy", userMaster.ModifiedBy);
                parameters.Add("@TypeId", StatusType.User);
                if (userMaster.IsActive)
                {
                    parameters.Add("@TypeStatusId", StatusType.Active);
                }
                else
                {
                    parameters.Add("@TypeStatusId", StatusType.DeActive);
                }

                var result = Convert.ToInt32(con.ExecuteScalar("ActiveDeactiveUser", param: parameters, commandType: CommandType.StoredProcedure));
                con.Close();
                return result;
            }
        }

        public AuthenticateResponse AuthenticateUser(AuthenticateRequest authenticateRequest)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Email", authenticateRequest.Email);
                parameters.Add("@Password", authenticateRequest.Password);

                var loginUserData = SqlMapper.Query<AuthenticateResponse>(con, "AuthenticateUser", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (loginUserData == null) return null;

                //getting jwt token for the user
                var jwtToken = generateJwtToken(loginUserData);
                loginUserData.JwtToken = jwtToken;
                con.Close();
                return loginUserData;
            }
        }

        public IEnumerable<UserMaster> GetAllUsers()
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                var result = SqlMapper.Query<UserMaster>(con, "GetAllUsers", null, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public int GetTotalActiveUsers()
        {
            string where = " IsActive = 1 ";
            return _generalGenericFunction.GetTotalCount(where, "UserMaster", "UserId");
        }

        public UserMaster GetUserDetailByEmail(string emailId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Email", emailId);
                var result = SqlMapper.Query<UserMaster>(con, "UserByEmail_GET", param: parameters, commandType: CommandType.StoredProcedure).SingleOrDefault();
                con.Close();
                return result;
            }
        }

        public UserMaster GetUserDetailById(long userId)
        {
            string where = " UserId = '" + userId + "' And IsActive = 1  And ";
            return _generalGenericFunction.GetField<UserMaster>(where, "UserMaster", "RegistrationName");
        }

        public long InsertUserMaster(UserMaster userMaster)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Email", userMaster.Email);
                parameters.Add("@Password", userMaster.Password);
                parameters.Add("@Title", userMaster.Title);
                parameters.Add("@RegistrationName", userMaster.RegistrationName);
                parameters.Add("@CountryCode", userMaster.CountryCode);
                parameters.Add("@ContactNo", userMaster.ContactNo);
                parameters.Add("@RoleId", userMaster.RoleId);
                parameters.Add("@IsActive", userMaster.IsActive);
                var result = Convert.ToInt64(con.ExecuteScalar("InsertUserMaster", param: parameters, commandType: CommandType.StoredProcedure));
                con.Close();
                return result;
            }
        }

        public string ResetPassword(UserMaster userMaster)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", userMaster.UserId);
                parameters.Add("@Password", userMaster.Password);
                var result = Convert.ToString(con.ExecuteScalar("UserResetPassword", param: parameters, commandType: CommandType.StoredProcedure));
                con.Close();
                return result;
            }
        }

        public bool ResetPasswordNewUser(UserMaster userMaster)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", userMaster.UserId);
                parameters.Add("@Password", userMaster.Password);
                var result = Convert.ToBoolean(con.ExecuteScalar("UserNewResetPassword", param: parameters, commandType: CommandType.StoredProcedure));
                con.Close();
                return result;
            }
        }

        public int UpdateUserMaster(UserMaster userMaster)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", userMaster.UserId);
                parameters.Add("@Email", userMaster.Email);
                parameters.Add("@Password", userMaster.Password);
                parameters.Add("@Title", userMaster.Title);
                parameters.Add("@RegistrationName", userMaster.RegistrationName);
                parameters.Add("@CountryCode", userMaster.CountryCode);
                parameters.Add("@ContactNo", userMaster.ContactNo);
                parameters.Add("@RoleId", userMaster.RoleId);
                parameters.Add("@IsActive", userMaster.IsActive);
                parameters.Add("@ProfilePicture", userMaster.ProfilePicture);
                var result = Convert.ToInt32(con.ExecuteScalar("UpdateUserMaster", param: parameters, commandType: CommandType.StoredProcedure));
                con.Close();
                return result;
            }
        }

        private string generateJwtToken(AuthenticateResponse user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JwtAuthentication:Secret"]);
            double tokenExpiryTime = Convert.ToDouble(_configuration["JwtAuthentication:ExpireTime"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(tokenExpiryTime),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}