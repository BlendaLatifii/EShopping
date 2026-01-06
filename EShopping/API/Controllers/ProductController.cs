using Application.DTO.Request;
using Application.DTO.Response;
using Application.Services;
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
    }
}
