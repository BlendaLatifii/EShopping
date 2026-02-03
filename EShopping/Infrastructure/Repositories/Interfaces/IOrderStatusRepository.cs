using Domain.Entities;

namespace Infrastructure.Repositories.Interfaces
{
    public interface IOrderStatusRepository : IGenericRepository<OrderStatus>
    {
        Task<Guid> GetDefaultStatusId();
        Task<Guid> GetStatusThatIsNotDefault();
    }
}
