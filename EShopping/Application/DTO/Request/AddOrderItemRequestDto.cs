namespace Application.DTO.Request
{
    public class AddOrderItemRequestDto
    {
        public int Quantity { get; set; }
        public Guid ProductId { get; set; }
    }
}
