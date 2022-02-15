using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace EWebList.WindowService
{
    public class EmailSent
    {
        public static void SendDirectoryEmail()
        {
            Service1 sr = new Service1();
            //GetUserAndDirectoryPlanDetails
            //string url = "http://localhost:41347/api/DirectoryMaster/GetUserAndDirectoryPlanDetails";
            string url = "http://www.eweblist.com/eweblistapi/api/DirectoryMaster/GetUserAndDirectoryPlanDetails";
            sr.WriteToFile("URL: "+ url);

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(url);

            HttpResponseMessage response = client.GetAsync(url).Result;  // Blocking call! Program will wait here until a response is received or a timeout occurs.
            sr.WriteToFile("7 Days Email: " + response.StatusCode);
            if (response.IsSuccessStatusCode)
            {
                // Parse the response body.
                //var dataObjects = response.Content.ReadAsAsync<IEnumerable<DataObject>>().Result;  //Make sure to add a reference to System.Net.Http.Formatting.dll
                //foreach (var d in dataObjects)
                //{
                //    Console.WriteLine("{0}", d.Name);
                //}
            }
            else
            {
                Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
            }

            //Make any other calls using HttpClient here.

            //Dispose once all HttpClient calls are complete. This is not necessary if the containing object will be disposed of; for example in this case the HttpClient instance will be disposed automatically when the application terminates so the following call is superfluous.
            client.Dispose();
        }

        public static void SendTodaysCreatedDirectoryDetails()
        {
            Service1 sr = new Service1();
            string url = "http://localhost:41347/api/DirectoryMaster/GetTodaysCreatedDirectoryDetails";
            //string url = "http://www.eweblist.com/eweblistapi/api/DirectoryMaster/GetTodaysCreatedDirectoryDetails";
            sr.WriteToFile("URL: " + url);

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(url);

            HttpResponseMessage response = client.GetAsync(url).Result;  
            sr.WriteToFile("Todays Created Directory: " + response.StatusCode);
            client.Dispose();
        }

        public static void SendTomorrowExpireDirectoryDetails()
        {
            Service1 sr = new Service1();
            string url = "http://localhost:41347/api/DirectoryMaster/GetTomorrowExpireDirectoryDetails";
            //string url = "http://www.eweblist.com/eweblistapi/api/DirectoryMaster/GetTomorrowExpireDirectoryDetails";
            sr.WriteToFile("URL: " + url);

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(url);

            HttpResponseMessage response = client.GetAsync(url).Result; 
            sr.WriteToFile("Tomorrow Expire Directory: " + response.StatusCode);
            client.Dispose();
        }

    }
}
