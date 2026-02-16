using Application.DTO.Response;
using Domain.Entities;
namespace Application.Services.Interfaces
{
    public interface IProductRecomandationService
    {
        Task<List<ProductResponseDto>> GetSimilarProducts(Guid productId, int top = 5);
    }
}
