using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class PaymentRepository : GenericRepository<Payment>, IPaymentRepository
    {
        public PaymentRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<List<Payment>> GetAllWithPaymentMethods() 
        {
                 return await _dbSet
                           .Include(x => x.PaymentMethod)
                           .ToListAsync();
        }

        public async Task<Payment?> GetPaymentWithPaymentMethods(Guid id)
        {
            return await _dbSet
                     .Include(x => x.PaymentMethod)
                     .FirstOrDefaultAsync();
        }
    }
}
