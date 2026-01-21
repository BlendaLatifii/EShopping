namespace Domain.Entities
{
    public class CartItem
    {
        public Guid Id { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public Guid CartId { get; set; }
        public Cart Cart { get; set; }
    }
}
