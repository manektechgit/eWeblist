using EWebList.Business.Abstract;
using Hangfire;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.IO;
using System.Text;

//using Microsoft.AspNetCore.Authentication.JwtBearer;
namespace EWebList.API
{
    public class Startup
    {
        private readonly string CorsPolicy = "CorsPolicy";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddDependency();

            services.AddCors();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Eweblist-Service", Version = "v1" });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme."
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                          new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                }
                            },
                            new string[] {}
                    }
                });
            });

            var key = Encoding.ASCII.GetBytes(Configuration["JwtAuthentication:Secret"]);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtAuthentication:Secret"])),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
            });
            services.AddCors(options =>
            {
                options.AddPolicy(CorsPolicy,
                    builder =>
                    {
                        builder
                                .AllowAnyOrigin()
                                .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });
            services.AddMvc(options => { options.Filters.Add(new ApiExceptionFilter()); })
                .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
            });
            services.AddDirectoryBrowser();
            string sConnectionString = Configuration["ConnectionStrings:DefaultConnection"];
            services.AddHangfire(x => x.UseSqlServerStorage(sConnectionString));
            services.AddHangfireServer();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory, IServiceProvider serviceProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            loggerFactory.AddLog4Net();

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "EWeblist Service");
            });

            app.UseHangfireDashboard();
            app.UseHangfireServer();
            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseDirectoryBrowser(new DirectoryBrowserOptions
            {
                FileProvider = new PhysicalFileProvider(
            Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images")),
                RequestPath = "/images"
            });

            app.UseCors(CorsPolicy);
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            RecurringJob.AddOrUpdate<IDirectoryMasterBusiness>("Monthly Co2Report", mm => mm.GetTodaysCreatedDirectoryDetails(), Cron.Daily(21), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
            //RecurringJob.AddOrUpdate(() => serviceProvider.GetService<IDirectoryMasterBusiness>().GetTodaysCreatedDirectoryDetails(), Cron.Daily(21, 00), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));//9:00 IST
            RecurringJob.AddOrUpdate(() => serviceProvider.GetService<IDirectoryMasterBusiness>().GetUserAndDirectoryPlanDetails(), Cron.Daily(00, 01), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time")); //00:00 IST
            RecurringJob.AddOrUpdate(() => serviceProvider.GetService<IDirectoryMasterBusiness>().GetTomorrowExpireDirectoryDetails(), Cron.Daily(00, 01), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));//00:00 IST
        }
    }
}