using Application.DTO.Request;
using Application.DTO.Response;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        private readonly IProductService _productService;

        public ProductController(IProductService productService) 
        {
            _productService = productService;    
        }

        [HttpPost]
        public async Task<ActionResult> AddProduct(AddProductRequestDto addProductRequestDto)
        {
            await _productService.AddProduct(addProductRequestDto);

            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductResponseDto>>> GetAllProducts()
        {
            var result = await _productService.GetAllProducts();

            return Ok(result);
        }

        [HttpGet("/category{categoryId}")]
        public async Task<ActionResult<List<ProductResponseDto>>> GetProductByCategory(Guid categoryId)
        {
            var result = await _productService.GetProductByCategory(categoryId);

            return Ok(result);
        }

        [HttpGet("/search{searchTerm}")]
        public async Task<ActionResult<List<ProductResponseDto>>> SearchProduct(string searchTerm)
        {
            var result = await _productService.SearchProduct(searchTerm);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductResponseDto>> GetProductById(Guid id)
        {
            var result = await _productService.GetProductById(id);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduct([FromRoute] Guid id, [FromBody] UpdateProductRequestDto updateProductRequestDto)
        {
            await _productService.UpdateProduct(id, updateProductRequestDto);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(Guid id)
        {
            await _productService.DeleteProduct(id);

            return Ok();
        }

        [HttpGet("GetProductSelectList")]
        public async Task<ActionResult<List<ListItemModel>>> GetProductSelectList()
        {
            var reuslt = await _productService.GetProductSelectList();

            return Ok(reuslt);
        }
    }
}
