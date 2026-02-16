using Application.DTO.Request;
using Application.DTO.Response;
using Application.Services.Interfaces;
using Infrastructure.Repositories.Seeds;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductController : ControllerBase
    {

        private readonly IProductService _productService;
        private readonly IProductRecomandationService _productRecomandation;

        public ProductController(IProductService productService , IProductRecomandationService productRecomandation) 
        {
            _productService = productService;  
            _productRecomandation = productRecomandation;
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpPost]
        public async Task<ActionResult> AddProduct(AddProductRequestDto addProductRequestDto)
        {
            await _productService.AddProduct(addProductRequestDto);

            return Ok();
        }

        [Authorize(Roles = Roles.Admin)]
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

        [HttpGet("/search")]
        public async Task<ActionResult<List<ProductResponseDto>>> SearchProduct([FromQuery]string? searchTerm, [FromQuery] string? sortBy)
        {
            var result = await _productService.SearchProduct(searchTerm,sortBy);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductResponseDto>> GetProductById(Guid id)
        {
            var result = await _productService.GetProductById(id);

            return Ok(result);
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduct([FromRoute] Guid id, [FromBody] UpdateProductRequestDto updateProductRequestDto)
        {
            await _productService.UpdateProduct(id, updateProductRequestDto);

            return Ok();
        }

        [Authorize(Roles = Roles.Admin)]
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

        [HttpGet("recommendation/{productId}")]
         public async Task<ActionResult<List<ProductResponseDto>>> GetSimilarProducts(Guid productId)
         {
            var result = await _productRecomandation.GetSimilarProducts(productId, 3);

            return Ok(result);
         }

        [HttpGet("products")]
        public async Task<ActionResult<List<ProductResponseDto>>> GetProductsByCategory()
        {
            var result = await _productService.GetProductsByCategory();

            return Ok(result);
        }

        [HttpGet("count-products")]
        public async Task<ActionResult<int>> CountProducts()
        {
            var result = await _productService.CountProduts();

            return Ok(result);
        }

        [HttpGet("products-by-category")]
        public async Task<ActionResult<List<ProductAndCategory>>> GetProductCountByCategoryAsync()
        {
            var result = await _productService.GetProductCountByCategoryAsync();

            return Ok(result);
        }
    }
}
