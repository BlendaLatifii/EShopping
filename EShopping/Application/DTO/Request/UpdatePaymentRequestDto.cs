namespace Application.DTO.Request
{
    public class UpdatePaymentRequestDto
    {
        public Guid? PaymentMethodId { get; set; }
        public string? CartNumber { get; set; }
        public string? CVV { get; set; }
        public int? Amount { get; set; }
    }
}
