namespace Application.DTO.Request
{
    public class AddPaymentRequestDto
    {
        public Guid PaymentMethodId { get; set; }
        public Guid OrderId { get; set; }
        public string CartNumber { get; set; }
        public string CVV { get; set; }
        public decimal Amount { get; set; }
    }
}
