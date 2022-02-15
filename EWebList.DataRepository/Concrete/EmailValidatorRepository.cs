using ARSoft.Tools.Net.Dns;
using Dapper;
using EWebList.DataRepository.Abstract;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Net.Sockets;
using System.Text;

namespace EWebList.DataRepository.Concrete
{
    public class EmailValidatorRepository : IEmailValidatorRepository
    {
        public IConfiguration _configuration { get; }

        public EmailValidatorRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public bool VerifyEmail(string emailId)
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("1."+emailId);
            try
            {
                MailAddress address = new MailAddress(emailId);
                string host = address.Host;
                string mailfrom = "snknamdev@gmail.com";
                var resolver = new DnsStubResolver();
                var records = resolver.Resolve<MxRecord>(host, RecordType.Mx);
                var telnetData = records.OrderBy(x => x.Preference).FirstOrDefault();
                sb.AppendLine("2." + telnetData.ToString());
                if (telnetData == null)
                {
                    return false;
                }
                TcpClient tClient = new TcpClient(telnetData.ExchangeDomainName.ToString(), 25);
                string CRLF = "\r\n";
                byte[] dataBuffer;
                string ResponseString;
                string ResponseStringRCPT;
                sb.AppendLine("3." + tClient.ToString());

                NetworkStream netStream = tClient.GetStream();
                StreamReader reader = new StreamReader(netStream);
                ResponseString = reader.ReadLine();
                sb.AppendLine("4." + ResponseString.ToString());

                /* Perform HELO to SMTP Server and get Response */
                reader = new StreamReader(netStream);
                dataBuffer = BytesFromString("HELO Hi" + CRLF);
                netStream.Write(dataBuffer, 0, dataBuffer.Length);
                ResponseString = reader.ReadLine();
                sb.AppendLine("5." + ResponseString.ToString());

                reader = new StreamReader(netStream);
                dataBuffer = BytesFromString($"MAIL FROM:<{mailfrom}>" + CRLF);
                netStream.Write(dataBuffer, 0, dataBuffer.Length);
                ResponseString = reader.ReadLine();
                sb.AppendLine("6." + ResponseString.ToString());

                /* Read Response of the RCPT TO Message to know from google if it exist or not */
                reader = new StreamReader(netStream);
                dataBuffer = BytesFromString($"RCPT TO:<{emailId}>" + CRLF);
                netStream.Write(dataBuffer, 0, dataBuffer.Length);
                ResponseStringRCPT = reader.ReadLine();
                sb.AppendLine("7." + ResponseStringRCPT.ToString());
                var responseCode = GetResponseCode(ResponseStringRCPT);

                /* QUITE CONNECTION */
                dataBuffer = BytesFromString("QUITE" + CRLF);
                netStream.Write(dataBuffer, 0, dataBuffer.Length);
                tClient.Close();
                EmailVerificationLog(sb.ToString());
                if (responseCode == 550)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            catch (System.Exception ex)
            {
                sb.AppendLine(ex.Message);
                EmailVerificationLog("Exception" + sb.ToString());
                return false;
            }
        }

        private static byte[] BytesFromString(string str)
        {
            return Encoding.ASCII.GetBytes(str);
        }

        private static int GetResponseCode(string ResponseString)
        {
            return int.Parse(ResponseString.Substring(0, 3));
        }

        public void EmailVerificationLog(string emailstring)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Category", "EmailValidation");
                parameters.Add("@Logdata", emailstring);
                con.ExecuteScalar("InsertAppLogs", param: parameters, commandType: CommandType.StoredProcedure);
            }
        }
    }
}