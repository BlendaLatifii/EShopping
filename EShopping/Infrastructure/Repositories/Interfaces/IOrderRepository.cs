using Domain.Entities;

namespace Infrastructure.Repositories.Interfaces
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        Task<Order?> GetOrderByUserId(Guid userId);
    }
}
