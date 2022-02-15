using EWebList.Business.Abstract;
using EWebList.DataRepository.Abstract;
using EWebList.DataRepository.Model;
using System.Collections.Generic;

namespace EWebList.Business.Concrete
{
    public class CountryCodeBusiness : ICountryCodeBusiness
    {
        private readonly ICountryCodeRepository _countryCodeRepository;

        public CountryCodeBusiness(ICountryCodeRepository countryCodeRepository)
        {
            _countryCodeRepository = countryCodeRepository;
        }

        public IEnumerable<CountryCodeMaster> GetAllCountryCodes()
        {
            return _countryCodeRepository.GetAllCountryCodes();
        }
    }
}