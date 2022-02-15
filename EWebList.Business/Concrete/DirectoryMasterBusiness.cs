using EWebList.Business.Abstract;
using EWebList.Common;
using EWebList.DataRepository.Abstract;
using EWebList.DataRepository.Model;
using EWebList.DataRepository.ViewModel;
using System.Collections.Generic;
using System.Linq;

namespace EWebList.Business.Concrete
{
    public class DirectoryMasterBusiness : IDirectoryMasterBusiness
    {
        private readonly IDirectoryMasterRepository _directoryMasterRepository;
        private readonly Email _email;
        private readonly IUserMasterRepository _userMasterRepository;

        public DirectoryMasterBusiness(IDirectoryMasterRepository directoryMasterRepository, Email email, IUserMasterRepository userMasterRepository)
        {
            _directoryMasterRepository = directoryMasterRepository;
            _email = email;
            _userMasterRepository = userMasterRepository;
        }

        public int DeleteDirectory(DirectoryMaster directoryMaster)
        {
            return _directoryMasterRepository.DeleteDirectory(directoryMaster);
        }

        public IEnumerable<DirectoryMaster> GetAllDirectory(PaginationModel paginationModel)
        {
            return _directoryMasterRepository.GetAllDirectory(paginationModel);
        }

        public IEnumerable<DirectoryMaster> GetDirectoryByDirectoryId(int directoryId)
        {
            return _directoryMasterRepository.GetDirectoryByDirectoryId(directoryId);
        }

        public IEnumerable<DirectoryMaster> GetDirectoryByUser(long userId)
        {
            return _directoryMasterRepository.GetDirectoryByUser(userId);
        }

        public IEnumerable<DirectoryMaster> GetDirectoryFilterby(int categoryId)
        {
            return _directoryMasterRepository.GetDirectoryFilterby(categoryId);
        }

        public IEnumerable<DirectoryMaster> GetDirectoryFilterby(int categoryId, string searchText)
        {
            return _directoryMasterRepository.GetDirectoryFilterby(categoryId, searchText);
        }

        public int GetTotalDirectory()
        {
            return _directoryMasterRepository.GetTotalDirectory();
        }

        public NonRegisteredDirectoryResponse InsertDirectoryNonRegisterUser(DirectoryVsUserVM directoryVsUserVM)
        {
            directoryVsUserVM.userMaster.Password = "";
            var result = _directoryMasterRepository.InsertDirectoryNonRegisterUser(directoryVsUserVM);
            if (result.IsNewUser == false && result.IsApproved)
            {
                _email.SiteRegistrationMailToUser(directoryVsUserVM);
                //_email.SiteRegistrationMailToAdmin(directoryVsUserVM);
            }
            else if (result.IsNewUser == true)
            {
                //email password reset link
                _email.PasswordMailNewUser(directoryVsUserVM.userMaster);
                // _email.SiteRegistrationMailToAdmin(directoryVsUserVM);
            }
            else if (result.IsNewUser == false && result.IsApproved == false)
            {
                //email password reset link again
                directoryVsUserVM.userMaster.UserId = result.UserId;
                _email.PasswordMailNewUser(directoryVsUserVM.userMaster);
            }
            return result;
        }

        public int InsertDirectoryRegisterUser(DirectoryMaster directoryMaster)
        {
            var result = _directoryMasterRepository.InsertDirectoryRegisterUser(directoryMaster);
            if (result > 0)
            {
                SendMailRefisteredUser(directoryMaster);
            }
            return result;
        }

        public bool IsWebsiteExist(DirectoryMaster directoryMaster)
        {
            return _directoryMasterRepository.IsWebsiteExist(directoryMaster);
        }

        public IEnumerable<DirectoryMaster> MySites(long userId)
        {
            return _directoryMasterRepository.MySites(userId);
        }

        public int UpdateDirectory(DirectoryMaster directoryMaster)
        {
            return _directoryMasterRepository.UpdateDirectory(directoryMaster);
        }

        public bool UpdateLogo(int directoryId, string logoName)
        {
            return _directoryMasterRepository.UpdateLogo(directoryId, logoName);
        }

        //Building Mail Data To send mail to registered user
        private void SendMailRefisteredUser(DirectoryMaster directoryMaster)
        {
            DirectoryVsUserVM directoryVsUserVM = new DirectoryVsUserVM();
            directoryVsUserVM.directoryMaster = directoryMaster;
            directoryVsUserVM.userMaster = _userMasterRepository.GetUserDetailById(directoryMaster.UserId);
            _email.SiteRegistrationMailToUser(directoryVsUserVM);
            //_email.SiteRegistrationMailToAdmin(directoryVsUserVM);
        }

        public DirectoryVsUserVM GetUserAndDirectoryPlanDetails()
        {
            DirectoryVsUserVM objDirectoryVsUserVM = _directoryMasterRepository.GetUserAndDirectoryPlanDetails();
            foreach (var user in objDirectoryVsUserVM.userMasterVM)
            {
                List<DirectoryMaster> userDirectories = objDirectoryVsUserVM.directoryMasterVM.Where(x => x.UserId == user.UserId).ToList();
                if (userDirectories.Count > 0)
                {
                    _email.DirectoryByUser(userDirectories, user);
                }
            }
            return objDirectoryVsUserVM;
        }

        public DirectoryVsUserVM GetTodaysCreatedDirectoryDetails()
        {
            DirectoryVsUserVM objDirectoryVsUserVM = _directoryMasterRepository.GetTodaysCreatedDirectoryDetails();
            _email.TodaysCreatedDirectoryDetails(objDirectoryVsUserVM.directoryMasterVM);
            return objDirectoryVsUserVM;
        }

        public DirectoryVsUserVM GetTomorrowExpireDirectoryDetails()
        {
            DirectoryVsUserVM objDirectoryVsUserVM = _directoryMasterRepository.GetTomorrowExpireDirectoryDetails();
            foreach (var user in objDirectoryVsUserVM.userMasterVM)
            {
                List<DirectoryMaster> userDirectories = objDirectoryVsUserVM.directoryMasterVM.Where(x => x.UserId == user.UserId).ToList();
                if (userDirectories.Count > 0)
                {
                    _email.DirectoryByUser(userDirectories, user);
                }
            }
            return objDirectoryVsUserVM;
        }
    }
}