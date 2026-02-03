using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        public OrderRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<Order?> GetOrderByUserId(Guid userId)
        {
            return await _dbSet
                .Include(x => x.User)
                .Include(x => x.Items)
                   .ThenInclude(x => x.Product)
                .FirstOrDefaultAsync(x => x.UserId == userId && x.OrderStatus.DefaultStatus);
        }
    }
}
