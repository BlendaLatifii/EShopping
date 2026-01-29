using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class OrderItemRepository : GenericRepository<OrderItem>, IOrderItemRepository
    {
        public OrderItemRepository(AppDbContext context) : base(context) { }

        public async Task<OrderItem?> GetOrderById(Guid id)
        {
            return await  _context.OrderItems
                  .Include(x => x.Order)
                  .Include(x => x.Product)
                  .Where(x => x.Id == id)
                  .FirstOrDefaultAsync();
        }
        public async Task<List<OrderItem>> GetOrderItems()
        {
            return await _dbSet
                .Include(x => x.Order)
                .Include(x => x.Product)
                .ToListAsync();
        }
    }
}
