using Domain.Entities;

namespace Infrastructure.Repositories.Interfaces
{
    public interface IOrderItemRepository : IGenericRepository<OrderItem>
    {
        Task<OrderItem?> GetOrderById(Guid id);
        Task<List<OrderItem>> GetOrderItems();
    }
}
