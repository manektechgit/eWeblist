using EWebList.DataRepository.Model;
using System.Collections.Generic;

namespace EWebList.Business.Abstract
{
    public interface ICountryCodeBusiness
    {
        IEnumerable<CountryCodeMaster> GetAllCountryCodes();
    }
}