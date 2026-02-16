using Domain.Entities;

namespace Infrastructure.Repositories.Interfaces
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        Task<List<Product>> GetProductsWithCategory(CancellationToken cancellationToken);
        Task<Product> GetProductWithCategory(Guid id, CancellationToken cancellationToken);
        Task<List<Product>> GetProductByCategory();
    }
}
