namespace Application.DTO.Request
{
    public class AddCartItemRequestDto
    {
        public int Quantity { get; set; } = 1;
        public Guid ProductId { get; set; }
    }
}
