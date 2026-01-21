namespace Application.DTO.Response
{
    public class CartItemResponseDto
    {
        public Guid Id { get; set; }

        public Guid ProductId { get; set; }  

        public string ProductName { get; set; }

        public string ImageUrl { get; set; }

        public decimal UnitPrice { get; set; }

        public int Quantity { get; set; }

        public decimal TotalPrice { get; set; }

    }
}
