using Application.DTO.Response;

namespace Application.Services.Interfaces
{
    public interface IOrderItemService
    {
        Task<List<OrderItemResponseDto>> GetAllOrderItems();
        Task<OrderItemResponseDto> GetOrderItemById(Guid id);
        Task DeleteOrderItem(Guid id);
        Task AddOrderItem(int quantity, Guid productId);
        Task UpdateOrderItem(Guid id, int quantity);
    }
}
