using Application.DTO.Request;
using Application.DTO.Response;

namespace Application.Services.Interfaces
{
    public interface IProductService
    {
        Task AddProduct(AddProductRequestDto addProductRequestDto);
        Task<List<ProductResponseDto>> GetAllProducts();
        Task<ProductResponseDto> GetProductById(Guid id);
        Task UpdateProduct(Guid id, UpdateProductRequestDto updateProductRequestDto);
        Task DeleteProduct(Guid id);
    }
}
