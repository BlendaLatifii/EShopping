using Application.DTO.Request;
using Application.DTO.Response;

namespace Application.Services.Interfaces
{
    public interface IPaymentService
    {
        Task AddPayment(AddPaymentRequestDto addPaymentRequestDto);
        Task<List<PaymentResponseDto>> GetAllPayments();
        Task<PaymentResponseDto> GetPaymentById(Guid id);
        Task UpdatePayment(Guid id, UpdatePaymentRequestDto updatePaymentRequestDto);
        Task DeletePayment(Guid id);
    }
}
