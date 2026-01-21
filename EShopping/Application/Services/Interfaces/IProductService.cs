using Application.DTO.Request;
using Application.DTO.Response;

namespace Application.Services.Interfaces
{
    public interface IProductService
    {
        Task AddProduct(AddProductRequestDto addProductRequestDto);
        Task<List<ProductResponseDto>> GetAllProducts();
        Task<ProductResponseDto> GetProductById(Guid id);
        Task<List<ProductResponseDto>> GetProductByCategory(Guid categoryId);
        Task UpdateProduct(Guid id, UpdateProductRequestDto updateProductRequestDto);
        Task<List<ProductResponseDto>> SearchProduct(string searchTerm);
        Task<List<ListItemModel>> GetProductSelectList();
        Task DeleteProduct(Guid id);
    }
}
