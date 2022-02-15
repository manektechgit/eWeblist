using EWebList.DataRepository.Model;
using System.Collections.Generic;

namespace EWebList.DataRepository.ViewModel
{
    public class DirectoryVsUserVM
    {
        public UserMaster userMaster { get; set; }

        public DirectoryMaster directoryMaster { get; set; }


        public IEnumerable<UserMaster> userMasterVM { get; set; }
        public IEnumerable<DirectoryMaster> directoryMasterVM { get; set; }
    }
}