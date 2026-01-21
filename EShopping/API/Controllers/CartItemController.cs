using Application.DTO.Request;
using Application.DTO.Response;
using Application.Services;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartItemController : ControllerBase
    {

        private readonly ICartItemService _cartItemService;

        public CartItemController(ICartItemService cartItemService) 
        {
            _cartItemService = cartItemService;    
        }

        [HttpPost]
        public async Task<ActionResult> AddCartItem(AddCartItemRequestDto addCartItemRequestDto)
        {
            await _cartItemService.AddCartItem(addCartItemRequestDto);

            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<List<CartItemResponseDto>>> GetAllCartItems()
        {
            var result = await _cartItemService.GetAllCartItems();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CartItemResponseDto>> GetCartItemById(Guid id)
        {
            var result = await _cartItemService.GetCartItemById(id);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCartItem([FromRoute] Guid id, [FromBody] UpdateCartItemRequestDto requestDto)
        {
            await _cartItemService.UpdateCartItem(id, requestDto.Quantity);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCartItem(Guid id)
        {
            await _cartItemService.DeleteCartItem(id);

            return Ok();
        }
    }
}
