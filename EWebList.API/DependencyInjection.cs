using EWebList.Business.Abstract;
using EWebList.Business.Concrete;
using EWebList.Common;
using EWebList.DataRepository.Abstract;
using EWebList.DataRepository.Concrete;
using Microsoft.Extensions.DependencyInjection;

namespace EWebList.API
{
    public static class DependencyInjection
    {
        public static void AddDependency(this IServiceCollection services)
        {
            services.AddScoped<IUserMasterRepository, UserMasterRepository>();
            services.AddScoped<IUserMasterBusiness, UserMasterBusiness>();
            services.AddScoped<ICategoryMasterBusiness, CategoryMasterBusiness>();
            services.AddScoped<ICategoryMasterRepository, CategoryMasterRepository>();
            services.AddScoped<ISubCategoryMasterBusiness, SubCategoryMasterBusiness>();
            services.AddScoped<ISubCategoryMasterRepository, SubCategoryMasterRepository>();
            services.AddScoped<IDirectoryMasterRepository, DirectoryMasterRepository>();
            services.AddScoped<IDirectoryMasterBusiness, DirectoryMasterBusiness>();
            services.AddScoped<IGeneralGenericFunction, GeneralGenericFunction>();
            services.AddScoped<ICountryCodeBusiness, CountryCodeBusiness>();
            services.AddScoped<ICountryCodeRepository, CountryCodeRepository>();
            services.AddScoped<IContactUsBusiness, ContactUsBusiness>();
            services.AddScoped<IContactUsRepository, ContactUsRepository>();
            services.AddScoped<IDropDownListItemBusiness, DropDownListItemBusiness>();
            services.AddScoped<IDropDownListItemRepository, DropDownListItemRepository>();
            services.AddScoped<IDirectoryClickDetailBusiness, DirectoryClickDetailBusiness>();
            services.AddScoped<IDirectoryClickDetailRepository, DirectoryClickDetailRepository>();
            services.AddScoped<IUserSettingBusiness, UserSettingBusiness>();
            services.AddScoped<IUserSettingRepository, UserSettingRepository>();
            services.AddScoped<IEmailSubscriptionBusiness, EmailSubscriptionBusiness>();
            services.AddScoped<IEmailSubscriptionRepository, EmailSubscriptionRepository>();
            services.AddScoped<IDirectoryPlanDetailsBusiness, DirectoryPlanDetailsBusiness>();
            services.AddScoped<IDirectoryPlanDetailsRepository, DirectoryPlanDetailsRepository>();
            services.AddScoped<IEmailValidatorBusiness, EmailValidatorBusiness>();
            services.AddScoped<IEmailValidatorRepository, EmailValidatorRepository>();
            services.AddScoped<ImageHelpers>();
            services.AddScoped<Email>();
        }
    }
}