using Domain.Entities;

namespace Infrastructure.Repositories.Interfaces
{
    public interface IPaymentRepository : IGenericRepository<Payment>
    {
        Task<List<Payment>> GetAllWithPaymentMethods();
        Task<Payment?> GetPaymentWithPaymentMethods(Guid id);
    }
}
