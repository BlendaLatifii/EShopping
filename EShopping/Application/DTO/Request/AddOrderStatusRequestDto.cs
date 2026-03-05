namespace Application.DTO.Request
{
    public class AddOrderStatusRequestDto
    {
        public string Name { get; set; } = string.Empty;
        public bool DefaultStatus { get; set; }
    }
}
