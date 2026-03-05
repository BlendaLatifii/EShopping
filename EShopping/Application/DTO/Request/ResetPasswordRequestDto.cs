namespace Application.DTO.Request
{
    public class ResetPasswordRequestDto
    {
        public string Token { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
