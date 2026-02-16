using Application.DTO.Request;
using Application.DTO.Response;
using Application.Services;
using Application.Services.Interfaces;
using Infrastructure.Repositories.Seeds;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {

        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService) 
        {
         _categoryService = categoryService;    
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpPost]
        public async Task<ActionResult> AddCategory(AddCategoryRequestDto addCategoryRequestDto)
        {
            await _categoryService.AddCategory(addCategoryRequestDto);

            return Ok();
        }


        [HttpGet]
        public async Task<ActionResult<List<CategoryResponseDto>>> GetAllCategories()
        {
            var result = await _categoryService.GetAllCategories();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryResponseDto>> GetCategoryById(Guid id)
        {
            var result = await _categoryService.GetCategoryById(id);

            return Ok(result);
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCategory([FromRoute] Guid id, [FromBody] UpdateCategoryRequestDto updateCategoryRequestDto)
        {
            await _categoryService.UpdateCategory(id, updateCategoryRequestDto);

            return Ok();
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(Guid id)
        {
            await _categoryService.DeleteCategory(id);

            return Ok();
        }

        [HttpGet("GetCategorySelectList")]
        public async Task<ActionResult<List<ListItemModel>>> GetCategorySelectList()
        {
            var result = await _categoryService.GetCategorySelectList();

            return Ok(result);
        }

        [HttpGet("count-categories")]
        public async Task<ActionResult<int>> CountCategories()
        {
            var result = await _categoryService.CountCategories();

            return Ok(result);
        }
    }
}
