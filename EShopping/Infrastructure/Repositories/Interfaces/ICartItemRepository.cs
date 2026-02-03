using Domain.Entities;

namespace Infrastructure.Repositories.Interfaces
{
    public interface ICartItemRepository : IGenericRepository<CartItem>
    {
        Task<CartItem?> GetByCartIdAndProductId(Guid cartId, Guid productId);
    }
}
