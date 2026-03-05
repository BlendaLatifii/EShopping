using Application.DTO.Response;
using Application.Services.Interfaces;
using Infrastructure.Repositories.Interfaces;

namespace Application.Services
{
    public class CartService : ICartService
    {

        private readonly ICartRepository _cartRepository;
        private readonly IIdentityService _identityService;
        
        public CartService(ICartRepository cartRepository, IIdentityService identityService) 
        { 
            _cartRepository = cartRepository;
            _identityService = identityService;
        }

        public async Task<CartDto> GetCartAsync() 
        {
            var userId = _identityService.GetCurrentUserId();
            var cart = await _cartRepository.GetCartByUserId(userId);
            if (cart == null)
            {
                return new CartDto
                {
                    Items = new List<CartItemResponseDto>(),
                    TotalPrice = 0
                };
            }

            return new CartDto
            {
                Id = cart.Id,
                Items = cart.CartItems.Select(ci => new CartItemResponseDto
                {
                    Id = ci.Id,
                    ProductId = ci.ProductId,
                    ProductName = ci.Product.Name,
                    ImageUrl = ci.Product.ImageUrl,
                    UnitPrice = ci.Product.Price,
                    Quantity = ci.Quantity,
                    TotalPrice = ci.Product.Price * ci.Quantity
                }).ToList(),
                TotalPrice = cart.CartItems.Sum(x => (x.Product.Price * x.Quantity)),
            };
        }
    }
}
