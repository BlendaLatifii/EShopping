using Application.DTO.Request;
using Application.DTO.Response;

namespace Application.Services.Interfaces
{
    public interface IPaymentMethodService
    {
        Task AddPaymentMethod(AddPaymentMethodRequestDto addPaymentMethodRequestDto);
        Task<List<PaymentMethodResponseDto>> GetAllPaymentMethods();
        Task<PaymentMethodResponseDto> GetPaymentMethodById(Guid id);
        Task UpdatePaymentMethod(Guid id, UpdatePaymentMethodRequestDto updatePaymentMethodRequestDto);
        Task DeletePaymentMethod(Guid id);
    }
}
