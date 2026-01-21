using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;

namespace Infrastructure.Repositories
{
    public class PaymentMethodRepository : GenericRepository<PaymentMethod>, IPaymentMethodRepository
    {
        public PaymentMethodRepository(AppDbContext context) : base(context)
        {
        }
    }
}
