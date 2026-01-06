namespace Application.DTO.Response
{
    public class RefreshTokenResponseDto : IAuthTokenResponse
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}
