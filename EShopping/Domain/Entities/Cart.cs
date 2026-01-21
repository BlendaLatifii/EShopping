namespace Domain.Entities
{
    public class Cart
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }    
        public User User { get; set; }
        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
        public decimal TotalPrice => CartItems.Sum(x => x.TotalPrice);
    }
}
