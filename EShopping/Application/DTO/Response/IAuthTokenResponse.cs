namespace Application.DTO.Response
{
    public interface IAuthTokenResponse
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}
