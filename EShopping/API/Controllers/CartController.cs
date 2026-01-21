using Application.DTO.Response;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {

        private readonly ICartService _cartService;
        private readonly IIdentityService _identityService;

        public CartController(ICartService cartService, IIdentityService identityService)
        {
            _cartService = cartService;
            _identityService = identityService;
        }

        [HttpPost]
        public async Task<ActionResult> AddToCartAsync([FromBody]Guid productId, int quantity)
        {
            var userId = _identityService.GetCurrentUserId();

            await _cartService.AddToCartAsync(userId, productId, quantity);
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<CartDto>> GetCartAsync()
        {
            var userId = _identityService.GetCurrentUserId();

            var cart = await _cartService.GetCartAsync(userId);
            return Ok(cart);
        }
    }
}
