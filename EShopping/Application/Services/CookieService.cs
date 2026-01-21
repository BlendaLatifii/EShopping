using Application.Services.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Application.Services
{
    public class CookieService : ICookieService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CookieService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string? Get(string key)
        {
            return _httpContextAccessor.HttpContext?.Request?.Cookies[key];
        }
    }
}
