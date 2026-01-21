using Application.DTO.Response;
using Application.Services.Interfaces;
using Domain.Entities;
using Infrastructure.Repositories.Interfaces;

namespace Application.Services
{
    public class CartService : ICartService
    {

        private readonly ICartRepository _cartRepository;
        private readonly ICartItemRepository _itemRepository;
        
        public CartService(ICartRepository cartRepository, ICartItemRepository itemRepository) 
        { 
            _cartRepository = cartRepository;
            _itemRepository = itemRepository;
        }

        public async Task AddToCartAsync(Guid userId, Guid productId, int quantity =1)
        {
            var cart =  await _cartRepository.GetCartByUserId(userId);

            if (cart == null)
            {
                 cart = new Cart 
                 {
                     UserId = userId 
                 };

                await _cartRepository.AddAsync(cart, CancellationToken.None);
            }

            var product = cart.CartItems.Select(x => x.Product).Where(x => x.Id == productId).FirstOrDefault();
            if (product == null)
                throw new Exception("Product not found");

            var cartItem = cart.CartItems
                .FirstOrDefault(x => x.ProductId == productId);

            if (cartItem != null)
            {
                cartItem.Quantity += quantity;
            }
            else
            {
                var newCartItem = new CartItem
                {
                    ProductId = productId,
                    Quantity = quantity,
                    UnitPrice = product.Price,
                    CartId = cart.Id
                };
                await _itemRepository.AddAsync(newCartItem, CancellationToken.None);
            }
        }

        public async Task<CartDto> GetCartAsync(Guid userId)
        {
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
                    UnitPrice = ci.UnitPrice,
                    Quantity = ci.Quantity,
                    TotalPrice = ci.TotalPrice
                }).ToList(),
                TotalPrice = cart.CartItems.Sum(x => x.TotalPrice)
            };
        }

    }
}
