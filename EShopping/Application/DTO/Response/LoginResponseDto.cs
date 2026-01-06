namespace Application.DTO.Response
{
    public class LoginResponseDto : IAuthTokenResponse
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}
