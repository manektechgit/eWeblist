using EWebList.DataRepository.Model;

namespace EWebList.DataRepository.Abstract
{
    public interface IContactUsRepository
    {
        int InsertContactInfo(ContactUs contactUs);
    }
}