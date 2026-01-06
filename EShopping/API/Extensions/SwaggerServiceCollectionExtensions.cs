using Microsoft.OpenApi.Models;

namespace API.Extensions
{
    public static class SwaggerServiceCollectionExtensions
    {
        public static void AddSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(option =>
            {
                option.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });

                option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "bearer"
                });

                option.AddSecurityRequirement(new OpenApiSecurityRequirement
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
                    new string[]{}
                   }
                });
            });
        }
    }
}

