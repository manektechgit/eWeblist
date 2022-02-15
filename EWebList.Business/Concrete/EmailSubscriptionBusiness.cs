using EWebList.Business.Abstract;
using EWebList.DataRepository.Abstract;

namespace EWebList.Business.Concrete
{
    public class EmailSubscriptionBusiness : IEmailSubscriptionBusiness
    {
        private readonly IEmailSubscriptionRepository _emailSubscriptionRepository;

        public EmailSubscriptionBusiness(IEmailSubscriptionRepository emailSubscriptionRepository)
        {
            _emailSubscriptionRepository = emailSubscriptionRepository;
        }

        public int InsertEmailSubscription(string emailId)
        {
            return _emailSubscriptionRepository.InsertEmailSubscription(emailId);
        }
    }
}