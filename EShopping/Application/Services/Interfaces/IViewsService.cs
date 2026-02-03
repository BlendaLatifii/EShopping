using Application.DTO.Response;
using Domain.Entities;

namespace Application.Services.Interfaces
{
    public interface IViewsService
    {
        Task<List<ProductResponseDto>> RecommendProducts(List<Product> allProducts, List<Views> interactions);
    }
}
