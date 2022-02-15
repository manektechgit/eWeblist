using EWebList.Business.Abstract;
using EWebList.Common;
using EWebList.DataRepository.Abstract;
using EWebList.DataRepository.Model;

namespace EWebList.Business.Concrete
{
    public class ContactUsBusiness : IContactUsBusiness
    {
        private readonly IContactUsRepository _contactUsRepository;
        private readonly IDropDownListItemBusiness _dropDownListItemBusiness;
        private readonly Email _email;

        public ContactUsBusiness(IContactUsRepository contactUsRepository, Email email, IDropDownListItemBusiness dropDownListItemBusiness)
        {
            _contactUsRepository = contactUsRepository;
            _email = email;
            _dropDownListItemBusiness = dropDownListItemBusiness;
        }

        public int InsertContactInfo(ContactUs contactUs)
        {
            var result = _contactUsRepository.InsertContactInfo(contactUs);
            var subject = _dropDownListItemBusiness.GetDropDonListItemById(contactUs.SubjectId);
            _email.ContactUsToAdmin(contactUs, subject.ItemName);
            _email.ContactUsToUser(contactUs);
            return result;
        }
    }
}