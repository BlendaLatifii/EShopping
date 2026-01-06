using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;

namespace Infrastructure.Repositories
{
    public class OrderStatusRepository : GenericRepository<OrderStatus> , IOrderStatusRepository
    {
        public OrderStatusRepository(AppDbContext appDbContext) : base(appDbContext) { }
    }
}
