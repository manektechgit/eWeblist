using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Controllers;

namespace EWebList.API
{
    public class CustomApiControllerActionInvoker : ApiControllerActionInvoker
    {
        public override Task<HttpResponseMessage> InvokeActionAsync(HttpActionContext actionContext, CancellationToken cancellationToken)
        {
            Task<HttpResponseMessage> result = base.InvokeActionAsync(actionContext, cancellationToken);

            if (result.Exception != null && result.Exception.GetBaseException() != null)
            {
                Exception baseException = result.Exception.InnerExceptions[0];//result.Exception.GetBaseException();
                Logger.Error("Application Error", baseException);
                return result;
            }
            else
            {
                // find proper methods from result for the api name
                Logger.Info("Application api info");
                return result;
            }

            //return base.InvokeActionAsync(actionContext, cancellationToken);
        }
    }
}