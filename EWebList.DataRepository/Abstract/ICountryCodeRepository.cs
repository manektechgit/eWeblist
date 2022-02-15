using EWebList.DataRepository.Model;
using System.Collections.Generic;

namespace EWebList.DataRepository.Abstract
{
    public interface ICountryCodeRepository
    {
        IEnumerable<CountryCodeMaster> GetAllCountryCodes();
    }
}