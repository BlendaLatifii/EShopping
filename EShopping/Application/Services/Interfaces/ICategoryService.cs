using Application.DTO.Request;
using Application.DTO.Response;

namespace Application.Services.Interfaces
{
    public interface ICategoryService
    {
        Task AddCategory(AddCategoryRequestDto addCategoryRequestDto);
        Task<List<CategoryResponseDto>> GetAllCategories();
        Task<CategoryResponseDto> GetCategoryById(Guid id);
        Task UpdateCategory(Guid id, UpdateCategoryRequestDto updateCategoryRequestDto);
        Task DeleteCategory(Guid id);
    }
}
