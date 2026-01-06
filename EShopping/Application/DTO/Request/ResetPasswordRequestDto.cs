namespace Application.DTO.Request
{
    public class ResetPasswordRequestDto
    {
        public string Token { get; set; }
        public string Password { get; set; }
    }
}
