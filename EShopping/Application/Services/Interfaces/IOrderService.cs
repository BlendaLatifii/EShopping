using Application.DTO.Response;
using Domain.Entities;

namespace Application.Services.Interfaces
{
    public interface IOrderService
    {
        Task<List<OrderResponseDto>> GetAllOrders();
        Task<OrderResponseDto> GetOrderById(Guid id);
        Task DeleteOrder(Guid id);
        Task<OrderResponseDto> GetOrderOfUser();
        Task<int> CountOrders();
        Task<List<DailySalesDto>> GetDailySalesAsync();
    }
}
