using Domain.Entities;

namespace Application.Services.Interfaces
{
    public interface ITokenService
    {
        public string GenerateToken(User user, List<string>? roles);
    }
}
