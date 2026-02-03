using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class OrderStatusRepository : GenericRepository<OrderStatus> , IOrderStatusRepository
    {
        public OrderStatusRepository(AppDbContext appDbContext) : base(appDbContext) { }

        public async Task<Guid> GetDefaultStatusId()
        {
            Guid defaultStatusId = await _dbSet
                .Where(x => x.DefaultStatus)
                .Select(x => x.Id)
                .FirstOrDefaultAsync();

            return defaultStatusId;
        }

        public async Task<Guid> GetStatusThatIsNotDefault()
        {
            Guid statusId = await _dbSet
                .Where(x => x.DefaultStatus == false)
                .Select(x => x.Id)
                .FirstOrDefaultAsync();

            return statusId;
        }
    }
}
