namespace Domain.Entities
{
    public class Payment
    {
        public Guid Id { get; set; }
        public Guid PaymentMethodId { get; set; }
        public PaymentMethod PaymentMethod { get; set; } = null!;
        public Guid OrderId { get; set; }
        public Order Order { get; set; } = null!;
        public DateTime TransactionDate { get; set; }
        public decimal Amount { get; set; }
    }
}
