using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(AppDbContext appDbContext) : base(appDbContext){ }

        public async Task<List<Product>> GetProductsWithCategory(CancellationToken cancellationToken)
        {
            return await _dbSet
                .Include(x => x.Category)
                .ToListAsync(cancellationToken);
        }

        public async Task<Product> GetProductWithCategory(Guid id, CancellationToken cancellationToken)
        {
            return await _dbSet
                .Where(x => x.Id == id)
                .Include(x => x.Category)
                .FirstAsync(cancellationToken);
        }

       public async Task<List<Product>> GetProductByCategory()
        {
            return await  _dbSet
                     .Include(p => p.Category)
                     .GroupBy(p => p.CategoryId)
                     .Select(g => g.First()) 
                     .ToListAsync();
        }
    }
}
