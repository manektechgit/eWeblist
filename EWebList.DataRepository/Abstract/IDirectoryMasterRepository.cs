using EWebList.DataRepository.Model;
using EWebList.DataRepository.ViewModel;
using System.Collections.Generic;

namespace EWebList.DataRepository.Abstract
{
    public interface IDirectoryMasterRepository
    {
        int DeleteDirectory(DirectoryMaster directoryMaster);

        IEnumerable<DirectoryMaster> GetAllDirectory(PaginationModel paginationModel);

        IEnumerable<DirectoryMaster> GetDirectoryByDirectoryId(int directoryId);

        IEnumerable<DirectoryMaster> GetDirectoryByUser(long userId);

        IEnumerable<DirectoryMaster> MySites(long userId);

        IEnumerable<DirectoryMaster> GetDirectoryFilterby(int categoryId);

        IEnumerable<DirectoryMaster> GetDirectoryFilterby(int categoryId, string searchText);

        int GetTotalDirectory();

        NonRegisteredDirectoryResponse InsertDirectoryNonRegisterUser(DirectoryVsUserVM directoryVsUserVM);

        int InsertDirectoryRegisterUser(DirectoryMaster directoryMaster);

        bool IsWebsiteExist(DirectoryMaster directoryMaster);

        int UpdateDirectory(DirectoryMaster directoryMaster);

        bool UpdateLogo(int directoryId, string logoName);

        DirectoryVsUserVM GetUserAndDirectoryPlanDetails();
        
        DirectoryVsUserVM GetTodaysCreatedDirectoryDetails();

        DirectoryVsUserVM GetTomorrowExpireDirectoryDetails();
    }
}