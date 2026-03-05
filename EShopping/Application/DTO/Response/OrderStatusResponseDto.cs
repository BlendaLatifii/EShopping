namespace Application.DTO.Response
{
    public class OrderStatusResponseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool DefaultStatus { get; set; }
    }
}
