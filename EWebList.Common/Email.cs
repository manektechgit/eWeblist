using EWebList.DataRepository.Abstract;
using EWebList.DataRepository.Model;
using EWebList.DataRepository.ViewModel;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace EWebList.Common
{
    public class Email
    {
        public const string SITE_NAME = "EWeblist";
        public EmailSettings emailSettings = new EmailSettings();
        public string logoUrl = string.Empty;
        private readonly IGeneralGenericFunction _generalGenericFunction;
        private readonly IHostingEnvironment _environment;

        public Email(IGeneralGenericFunction generalGenericFunction, IConfiguration configuration, IHostingEnvironment env)
        {
            _generalGenericFunction = generalGenericFunction;
            _configuration = configuration;
            _environment = env;
        }

        public IConfiguration _configuration { get; }

        public void ContactUsToAdmin(ContactUs contactUs, string conytactUsSubject)
        {
            try
            {
                string path = Environment.CurrentDirectory + "/TemplateEmail/" + MailTemplates.CONTACT_US;
                string subject = "Contact us request recieved ! " + SITE_NAME;
                logoUrl = _configuration["baseUrl"] + "images/logo.png";
                StreamReader str = new StreamReader(path);
                LoadEmailSettings();
                emailSettings.EmailTemplate = str.ReadToEnd();
                str.Close();
                string MailText = emailSettings.EmailTemplate
                    .Replace("[#LogoUrl#]", logoUrl)
                    .Replace("[#fullname#]", contactUs.Name)
                    .Replace("[#Subject#]", conytactUsSubject)
                    .Replace("[#Message#]", contactUs.Message)
                    .Replace("[#SignatureName#]", emailSettings.MailSignatureName);

                SendMail(MailText, subject, emailSettings.AdminEmail);
            }
            catch (Exception)
            {
            }
        }

        public void ContactUsToUser(ContactUs contactUs)
        {
            try
            {
                string path = Environment.CurrentDirectory + "/TemplateEmail/" + MailTemplates.CONTACT_US_USER;
                string subject = "Message Send Sucessfully ! " + SITE_NAME;
                logoUrl = _configuration["baseUrl"] + "images/logo.png";
                StreamReader str = new StreamReader(path);
                LoadEmailSettings();
                emailSettings.EmailTemplate = str.ReadToEnd();
                str.Close();
                string MailText = emailSettings.EmailTemplate
                    .Replace("[#LogoUrl#]", logoUrl)
                    .Replace("[#fullname#]", contactUs.Name)
                    .Replace("[#SignatureName#]", emailSettings.MailSignatureName);

                SendMail(MailText, subject, contactUs.Email);
            }
            catch (Exception)
            {
            }
        }

        public void ForgetPasswordMail(UserMaster userMaster)
        {
            try
            {
                string path = Environment.CurrentDirectory + "/TemplateEmail/" + MailTemplates.FORGET_PASSWORD;
                string subject = "Reset Your Password ! " + SITE_NAME;
                logoUrl = _configuration["baseUrl"] + "images/logo.png";
                string forgetPasswordUrl = _configuration["clientWebUrl"] + "reset-password/" + CrptographyEngine.Base64Encode(userMaster.UserId.ToString());
                StreamReader str = new StreamReader(path);
                LoadEmailSettings();
                emailSettings.EmailTemplate = str.ReadToEnd();
                str.Close();
                string MailText = emailSettings.EmailTemplate
                    .Replace("[#LogoUrl#]", logoUrl)
                    .Replace("[#fullname#]", userMaster.RegistrationName)
                    .Replace("[#resetPass#]", forgetPasswordUrl)
                    .Replace("[#SignatureName#]", emailSettings.MailSignatureName);

                SendMail(MailText, subject, userMaster.Email);
            }
            catch (Exception)
            {
            }
        }

        public void PasswordMailNewUser(UserMaster userMaster)
        {
            try
            {
                string path = Environment.CurrentDirectory + "/TemplateEmail/" + MailTemplates.PASSWORD_CHANGE_NEWUSER;
                string subject = "Change Your Password ! " + SITE_NAME;
                logoUrl = _configuration["baseUrl"] + "images/logo.png";
                string forgetPasswordUrl = _configuration["clientWebUrl"] + "change-password/" + CrptographyEngine.Base64Encode(userMaster.UserId.ToString());
                StreamReader str = new StreamReader(path);
                LoadEmailSettings();
                emailSettings.EmailTemplate = str.ReadToEnd();
                str.Close();
                string MailText = emailSettings.EmailTemplate
                    .Replace("[#LogoUrl#]", logoUrl)
                    .Replace("[#fullname#]", userMaster.RegistrationName)
                    .Replace("[#resetPass#]", forgetPasswordUrl)
                    .Replace("[#SignatureName#]", emailSettings.MailSignatureName);

                SendMail(MailText, subject, userMaster.Email);
            }
            catch (Exception)
            {
            }
        }

        public void PasswordChangeSucessMail(UserMaster userMaster)
        {
            try
            {
                string path = Environment.CurrentDirectory + "/TemplateEmail/" + MailTemplates.PASSWORD_CHANGED;
                string subject = "Password Changed Sucessfully! " + SITE_NAME;
                logoUrl = _configuration["baseUrl"] + "images/logo.png";
                StreamReader str = new StreamReader(path);
                LoadEmailSettings();
                emailSettings.EmailTemplate = str.ReadToEnd();
                str.Close();
                string MailText = emailSettings.EmailTemplate
                    .Replace("[#LogoUrl#]", logoUrl)
                    .Replace("[#fullname#]", userMaster.RegistrationName)
                    .Replace("[#SignatureName#]", emailSettings.MailSignatureName);

                SendMail(MailText, subject, userMaster.Email);
            }
            catch (Exception)
            {
            }
        }

        public void SiteRegistrationMailToAdmin(DirectoryVsUserVM directoryVsUserVM)
        {
            try
            {
                string path = Environment.CurrentDirectory + "/TemplateEmail/" + MailTemplates.SITE_ADDED_ADMIN;
                string subject = "New site " + directoryVsUserVM.directoryMaster.BusinessName + " added to " + SITE_NAME;
                logoUrl = _configuration["baseUrl"] + "images/logo.png";
                StreamReader str = new StreamReader(path);
                LoadEmailSettings();
                emailSettings.EmailTemplate = str.ReadToEnd();
                str.Close();
                string MailText = emailSettings.EmailTemplate
                    .Replace("[#LogoUrl#]", logoUrl)
                    .Replace("[#fullname#]", "Admin")
                    .Replace("[#submittedBy#]", directoryVsUserVM.userMaster.RegistrationName)
                    .Replace("[#Email#]", directoryVsUserVM.userMaster.Email)
                    .Replace("[#sitename#]", directoryVsUserVM.directoryMaster.BusinessName)
                    .Replace("[#siteheadline#]", directoryVsUserVM.directoryMaster.ListingHeadline)
                    .Replace("[#siteurl#]", directoryVsUserVM.directoryMaster.WebsiteUrl)
                    .Replace("[#SignatureName#]", emailSettings.MailSignatureName);

                //TODO : Remove Admin TO dynamic
                SendMail(MailText, subject, emailSettings.AdminEmail);
            }
            catch (Exception)
            {
            }
        }

        public void SiteRegistrationMailToUser(DirectoryVsUserVM directoryVsUserVM)
        {
            try
            {
                string path = Environment.CurrentDirectory + "/TemplateEmail/" + MailTemplates.SITE_ADDED;
                string subject = "Congratulation  site " + directoryVsUserVM.directoryMaster.BusinessName + " added to " + SITE_NAME;
                logoUrl = _configuration["baseUrl"] + "images/logo.png";
                string loginurl = _configuration["clientWebUrl"] + "login/";
                StreamReader str = new StreamReader(path);
                LoadEmailSettings();
                emailSettings.EmailTemplate = str.ReadToEnd();
                str.Close();
                string MailText = emailSettings.EmailTemplate
                    .Replace("[#LogoUrl#]", logoUrl)
                    .Replace("[#fullname#]", directoryVsUserVM.userMaster.RegistrationName)
                    .Replace("[#sitename#]", directoryVsUserVM.directoryMaster.BusinessName)
                    .Replace("[#siteheadline#]", directoryVsUserVM.directoryMaster.ListingHeadline)
                    .Replace("[#siteurl#]", directoryVsUserVM.directoryMaster.WebsiteUrl)
                    .Replace("[#loginLink#]", loginurl)
                    .Replace("[#SignatureName#]", emailSettings.MailSignatureName);

                SendMail(MailText, subject, directoryVsUserVM.userMaster.Email);
            }
            catch (Exception)
            {
            }
        }

        public void DirectoryByUser(List<DirectoryMaster> directoryMasterList, UserMaster userMaster)
        {
            try
            {
                string path = Environment.CurrentDirectory + "/TemplateEmail/" + MailTemplates.DIRECTORY_BY_USER;
                string subject = "List of Directory";
                logoUrl = _configuration["baseUrl"] + "images/logo.png";
                string loginurl = _configuration["clientWebUrl"] + "login/";
                StreamReader str = new StreamReader(path);
                LoadEmailSettings();
                emailSettings.EmailTemplate = str.ReadToEnd();
                str.Close();

                //DirectoryMaster directoryMaster = directoryMasterList[0];
                StringBuilder sb = new StringBuilder();
                foreach (DirectoryMaster directoryMaster in directoryMasterList)
                {
                    string cardTemplate = Environment.CurrentDirectory + "/TemplateEmail/" + MailTemplates.CARD_DIRECTORY;
                    StreamReader strCard = new StreamReader(cardTemplate);
                    string cardEmailTemplate = strCard.ReadToEnd();
                    string createdDate = directoryMaster.CreatedDate.HasValue ? directoryMaster.CreatedDate.Value.ToString("dd MMM") : string.Empty;

                    string cardMailText = cardEmailTemplate
                        .Replace("[#sitename#]", directoryMaster.BusinessName)
                        .Replace("[#siteheadline#]", directoryMaster.ListingHeadline)
                        .Replace("[#siteurl#]", directoryMaster.WebsiteUrl)
                        .Replace("[#description#]", directoryMaster.Description)
                        .Replace("[#logo#]", _configuration["baseUrl"] + @"\" + _configuration["FileUploadDirectory:Directory"] + "\\" + directoryMaster.Logo)
                        .Replace("[#keyword#]", directoryMaster.Keywords)
                        //.Replace("[#createdDate#]", createdDate)
                        .Replace("[#expireDate#]", directoryMaster.ExpireDate.Value.ToString("dd-MMM-yyyy"));

                    sb.Append(cardMailText);
                }

                string MailText = emailSettings.EmailTemplate
                        .Replace("[#LogoUrl#]", logoUrl)
                        .Replace("[#fullname#]", userMaster.RegistrationName)
                        .Replace("[#loginLink#]", loginurl)
                        .Replace("[#SignatureName#]", emailSettings.MailSignatureName)
                        .Replace("[#cardDirectory#]", sb.ToString())
                        .Replace("[#NoDirectory#]", "");

                SendMail(MailText, subject, userMaster.Email);
            }
            catch (Exception ex)
            {
            }
        }

        public void TodaysCreatedDirectoryDetails(IEnumerable<DirectoryMaster> directoryMasterList)
        {
            try
            {
                string path = Environment.CurrentDirectory + "/TemplateEmail/" + MailTemplates.DIRECTORY_BY_USER;

                string subject = "List of Directory";
                logoUrl = _configuration["baseUrl"] + "images/logo.png";
                string loginurl = _configuration["clientWebUrl"] + "login/";
                StreamReader str = new StreamReader(path);
                LoadEmailSettings();
                emailSettings.EmailTemplate = str.ReadToEnd();
                str.Close();

                //DirectoryMaster directoryMaster = directoryMasterList[0];
                StringBuilder sb = new StringBuilder();
                StringBuilder sbkeyword = new StringBuilder();
                foreach (DirectoryMaster directoryMaster in directoryMasterList)
                {
                    string cardTemplate = Environment.CurrentDirectory + "/TemplateEmail/" + MailTemplates.CARD_DIRECTORY;
                    string keywords = Environment.CurrentDirectory + "/TemplateEmail/" + MailTemplates.KEYWORDS;

                    StreamReader strCard = new StreamReader(cardTemplate);
                    string cardEmailTemplate = strCard.ReadToEnd();

                    StreamReader strKeywords = new StreamReader(keywords);
                    string keyWordTemplate = strKeywords.ReadToEnd();

                    string[] keyWords = directoryMaster.Keywords.Split(",");
                    foreach (string i in keyWords)
                    {
                        if (i != string.Empty)
                        {
                            string a= keyWordTemplate.Replace("[#keywordList#]", i);
                            sbkeyword.Append(a);
                        }
                    }

                    string createdDate = directoryMaster.CreatedDate.HasValue ? directoryMaster.CreatedDate.Value.ToString("dd MMM") : string.Empty;

                    string cardMailText = cardEmailTemplate
                        .Replace("[#sitename#]", directoryMaster.BusinessName)
                        .Replace("[#siteheadline#]", directoryMaster.ListingHeadline)
                        .Replace("[#siteurl#]", directoryMaster.WebsiteUrl)
                        .Replace("[#description#]", directoryMaster.Description)
                        .Replace("[#logo#]", _configuration["baseUrl"] + @"\" + _configuration["FileUploadDirectory:Directory"] + "\\" + directoryMaster.Logo)
                        .Replace("[#keyword#]", sbkeyword.ToString())
                        .Replace("[#createdDate#]", createdDate)
                        .Replace("[#expireDate#]", directoryMaster.ExpireDate.Value.ToString("dd-MMM-yyyy"));

                    sb.Append(cardMailText);
                }

                string MailText = emailSettings.EmailTemplate
                        .Replace("[#LogoUrl#]", logoUrl)
                        .Replace("[#fullname#]", "Admin")
                        .Replace("[#loginLink#]", loginurl)
                        .Replace("[#SignatureName#]", emailSettings.MailSignatureName)
                        .Replace("[#cardDirectory#]", sb.ToString())
                        .Replace("[#NoDirectory#]", (directoryMasterList.ToList().Count == 0) ? "<p>There is no post for the day !!</p>" : "");

                SendMail(MailText, subject, emailSettings.AdminEmail);
            }
            catch (Exception ex)
            {
            }
        }

        private void LoadEmailSettings()
        {
            var result = _generalGenericFunction.ExecuteProcedure<EmailSettings>("GetMailSetting", null);
            emailSettings.MailFrom = result.MailFrom;
            emailSettings.Password = result.Password;
            emailSettings.MailSignatureName = result.MailSignatureName;
            emailSettings.ServerName = result.ServerName;
            emailSettings.Port = result.Port;
            emailSettings.EnableSsl = result.EnableSsl;
            emailSettings.UserName = result.UserName;
            emailSettings.AdminEmail = result.AdminEmail;
            emailSettings.DisplayName = result.DisplayName;
        }

        private async Task SendMail(string body, string subject, string toAddress)
        {
            try
            {
                using (MailMessage mail = new MailMessage())
                {
                    mail.From = new MailAddress(emailSettings.MailFrom, emailSettings.DisplayName);
                    mail.To.Add(toAddress);
                    mail.Subject = subject;
                    mail.Body = body;
                    mail.IsBodyHtml = true;

                    ServicePointManager.SecurityProtocol = (SecurityProtocolType)3072;
                    //ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls12;
                    ServicePointManager.Expect100Continue = false;

                    using (SmtpClient smtp = new SmtpClient(emailSettings.ServerName, Convert.ToInt16(emailSettings.Port)))
                    {
                        smtp.EnableSsl = emailSettings.EnableSsl;
                        smtp.UseDefaultCredentials = false;
                        smtp.Credentials = new NetworkCredential(emailSettings.UserName, emailSettings.Password);
                        smtp.Host = emailSettings.ServerName;
                        smtp.Port = Convert.ToInt16(emailSettings.Port);

                        await smtp.SendMailAsync(mail);
                    }
                }
            }
            catch (Exception ex)
            {
            }
        }
    }

    public class MailTemplates
    {
        public static string CONTACT_US = "ContactUs.html";
        public static string CONTACT_US_USER = "ContactUsMailToUser.html";
        public static string FORGET_PASSWORD = "ForgotPassword.html";
        public static string PASSWORD_CHANGE_NEWUSER = "PasswordChangeNewUser.html";
        public static string PASSWORD_CHANGED = "PasswordChanged.html";
        public static string REGISTER_USER = "RegisterUser.html";
        public static string REGISTRATION_ACKNOWLEDGE = "RegistrationAcknowledge.html";
        public static string SITE_ADDED = "NewSiteAdded.html";
        public static string SITE_ADDED_ADMIN = "NewSiteAddedAdmin.html";
        public static string DIRECTORY_BY_USER = "DirectoryByUser.html";
        public static string CARD_DIRECTORY = "CardDirectory.html";
        public static string KEYWORDS = "keywords.html";
    }
}