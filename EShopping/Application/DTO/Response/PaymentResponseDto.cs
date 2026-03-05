namespace Application.DTO.Response
{
    public class PaymentResponseDto
    {
        public Guid Id { get; set; }
        public Guid PaymentMethodId { get; set; }
        public string PaymentMethodName { get; set; } = string.Empty;
        public DateTime TransactionDate { get; set; }
        public decimal Amount { get; set; }
    }
}
