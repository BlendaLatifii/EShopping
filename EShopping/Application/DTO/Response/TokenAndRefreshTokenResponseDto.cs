using Domain.Entities;

namespace Application.DTO.Response
{
    public class TokenAndRefreshTokenResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public RefreshToken RefreshToken { get; set; }
    }
}
