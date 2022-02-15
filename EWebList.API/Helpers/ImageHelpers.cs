using EWebList.API.Helpers;
using EWebList.DataRepository.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;

namespace EWebList.API
{
    public class ImageHelpers
    {
        private readonly IHostingEnvironment _environment;
        public IConfiguration _configuration { get; }

        public ImageHelpers(IHostingEnvironment environment, IConfiguration configuration)
        {
            _environment = environment;
            _configuration = configuration;
        }

        public void ConvertToBase64Image(FileToUpload file)
        {
            if (file != null && file.fileAsBase64.Contains(","))
            {
                file.fileAsBase64 = file.fileAsBase64.Split(",")[1];
                file.FileAsByteArray = Convert.FromBase64String(file.fileAsBase64);
            }
        }

        public void UploadImage(FileToUpload filetoUpload, string fileName, FileUploadDirectoryEnum fileUploadDirectoryEnum)
        {
            if (filetoUpload != null)
            {
                string directory = string.Empty;
                if (fileUploadDirectoryEnum == FileUploadDirectoryEnum.Category)
                {
                    directory = _environment.WebRootPath + @"\" + _configuration["FileUploadDirectory:Category"];
                }
                else if (fileUploadDirectoryEnum == FileUploadDirectoryEnum.SubCategory)
                {
                    directory = _environment.WebRootPath + @"\" + _configuration["FileUploadDirectory:SubCategory"];
                }
                else if (fileUploadDirectoryEnum == FileUploadDirectoryEnum.Directory)
                {
                    directory = _environment.WebRootPath + @"\" + _configuration["FileUploadDirectory:Directory"];
                }
                else if (fileUploadDirectoryEnum == FileUploadDirectoryEnum.User)
                {
                    directory = _environment.WebRootPath + @"\" + _configuration["FileUploadDirectory:Users"];
                }
                DirectoryInfo dir1;
                dir1 = new DirectoryInfo(directory);
                if (!dir1.Exists)
                    dir1.Create();

                var uploads = Path.Combine(directory, fileName);
                if (System.IO.File.Exists(uploads))
                {
                    System.IO.File.Delete(uploads);
                }
                using (var fs = new FileStream(uploads, FileMode.CreateNew))
                {
                    fs.Write(filetoUpload.FileAsByteArray, 0,
                             filetoUpload.FileAsByteArray.Length);
                }
            }
        }
        
    }
}