using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;

namespace Infrastructure.Repositories
{
    public class CartItemRepository : GenericRepository<CartItem>, ICartItemRepository
    {
        public CartItemRepository(AppDbContext context) : base(context)
        {
        }
    }
}
