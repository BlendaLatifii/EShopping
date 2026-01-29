namespace Application.DTO.Response
{
    public class OrderResponseDto
    {
        public Guid Id { get; set; }
        public DateTime OrderTime { get; set; }
        public decimal TotalAmmount { get; set; }
        public List<OrderItemResponseDto> Items { get; set; } = new();
    }
}
