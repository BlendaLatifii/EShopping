using Application.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Application.Services
{
    public class IdentityService : IIdentityService
    {
        private readonly ClaimsPrincipal claimsPrincipal;

        public IdentityService(IHttpContextAccessor httpContextAccessor)
        {
            this.claimsPrincipal = httpContextAccessor.HttpContext?.User ?? new ClaimsPrincipal();
        }
        public Guid GetCurrentUserId()
        {
            string? id = claimsPrincipal?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!string.IsNullOrEmpty(id) && Guid.TryParse(id, out Guid parsedId))
            {
                return parsedId;
            }

            return Guid.Empty;
        }
    }
}
