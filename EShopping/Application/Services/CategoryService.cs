using Application.DTO.Request;
using Application.DTO.Response;
using Application.Services.Interfaces;
using Domain.Entities;
using Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class CategoryService : ICategoryService
    {

        private readonly ICategoryRepository _categoryRepository;
        
        public CategoryService(ICategoryRepository categoryRepository) 
        { 
          _categoryRepository = categoryRepository;
        }

        public async Task AddCategory(AddCategoryRequestDto addCategoryRequestDto)
        {
            var category = MapToEntity(addCategoryRequestDto);

            await _categoryRepository.AddAsync(category, CancellationToken.None);
        }

        public async Task<List<CategoryResponseDto>> GetAllCategories()
        {
           var categories = await _categoryRepository.GetAllAsync(CancellationToken.None);
            
           var model = categories.Select(x => MapToDto(x)).ToList();

           return model;
        }

        public async Task<CategoryResponseDto> GetCategoryById(Guid id)
        {
            var category = await _categoryRepository.GetByIdAsync(id, CancellationToken.None);
            if (category == null) 
            {
                throw new Exception("Category not found");
            }

            var model = MapToDto(category);

            return model;
        }

        public async Task UpdateCategory(Guid id, UpdateCategoryRequestDto updateCategoryRequestDto)
        {
            var category = await _categoryRepository.GetByIdAsync(id, CancellationToken.None);
            if (category == null)
            {
                throw new Exception("Category not found");
            }

            category = MapUpdateCategory(category, updateCategoryRequestDto);

            await _categoryRepository.UpdateAsync(category, CancellationToken.None);
        }

        private Category MapUpdateCategory(Category category, UpdateCategoryRequestDto updateCategoryRequestDto)
        {
            category.Name = updateCategoryRequestDto.Name ?? category.Name;

            return category;
        }

        public async Task DeleteCategory(Guid id)
        {
            var category = await _categoryRepository.GetByIdAsync(id, CancellationToken.None);
            if (category == null)
            {
                throw new Exception("Category not found");
            }

            await _categoryRepository.DeleteAsync(category, CancellationToken.None);
        }

        private CategoryResponseDto  MapToDto(Category category)
        {
            return new CategoryResponseDto
            {
                Id = category.Id,
                Name = category.Name,
            };
        }

        private Category MapToEntity(AddCategoryRequestDto addCategoryRequestDto)
        {
            return new Category
            {
                Name = addCategoryRequestDto.Name,
            };
        }

        public async Task<List<ListItemModel>> GetCategorySelectList()
        {
            var category = await _categoryRepository.Query()
                .Select(x => new ListItemModel
                {
                    Id = x.Id,
                    Name = x.Name,
                }).ToListAsync();

            return category;
        }
    }
}
