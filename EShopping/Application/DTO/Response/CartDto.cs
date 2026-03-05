using Domain.Enums;

namespace Application.DTO.Response
{
    public class CartDto
    {
        public Guid Id { get; set; }  
        public List<CartItemResponseDto> Items { get; set; } = new List<CartItemResponseDto>();
        public decimal TotalPrice { get; set; }
    }
}
