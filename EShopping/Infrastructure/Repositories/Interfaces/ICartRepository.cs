using Domain.Entities;

namespace Infrastructure.Repositories.Interfaces
{
    public interface ICartRepository : IGenericRepository<Cart>
    {
        Task<Cart?> GetCartByUserId(Guid userId);
    }
}
