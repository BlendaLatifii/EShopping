using Domain.Entities;

namespace Application.DTO.Response
{
    public class TokenAndRefreshTokenResponseDto
    {
        public string Token { get; set; }
        public RefreshToken RefreshToken { get; set; }
    }
}
