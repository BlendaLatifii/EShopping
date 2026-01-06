namespace Application.DTO.Request
{
    public class AddUserRequestDto
    {
        public string Email { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public string Password { get; set; } = string.Empty;
        public string ConfirmPassword { get; set; } = string.Empty;
        public Guid RoleId { get; set; }
    }
}
