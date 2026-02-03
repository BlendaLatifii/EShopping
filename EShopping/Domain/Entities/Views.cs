namespace Domain.Entities
{
    public class Views
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public DateTime ViewedOn { get; set; }
    }
}
