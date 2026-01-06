namespace Application.DTO.Request
{
    public class UpdateUserRequestDto
    {
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public Guid? RoleId { get; set; }
    }
}
