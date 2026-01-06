using Application.DTO.Request;
using Application.DTO.Response;

namespace Application.Services.Interfaces
{
    public interface IOrderStatusService
    {
        Task AddOrderStatus(AddOrderStatusRequestDto addOrderStatusRequestDto);
        Task<List<OrderStatusResponseDto>> GetAllOrderStatuses();
        Task<OrderStatusResponseDto> GetOrderStatusById(Guid id);
        Task UpdateOrderStatus(Guid id, UpdateOrderStatusRequestDto updateOrderStatusRequestDto);
        Task DeleteOrderStatus(Guid id);
    }
}
