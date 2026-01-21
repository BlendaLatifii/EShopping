using Application.DTO.Request;
using Application.DTO.Response;
using Application.Services.Interfaces;
using Domain.Entities;
using Infrastructure.Repositories.Interfaces;

namespace Application.Services
{
    public class CartItemService : ICartItemService
    {

        private readonly ICartItemRepository _cartItemRepository;
        
        public CartItemService(ICartItemRepository cartItemRepository) 
        {
            _cartItemRepository = cartItemRepository;
        }

        public async Task AddCartItem(AddCartItemRequestDto addCartItemRequestDto)
        {
            var cartItem = MapToEntity(addCartItemRequestDto);

            await _cartItemRepository.AddAsync(cartItem, CancellationToken.None);
        }

        public async Task<List<CartItemResponseDto>> GetAllCartItems()
        {
           var cartItems = await _cartItemRepository.GetAllAsync(CancellationToken.None);
            
           var model = cartItems.Select(x => MapToDto(x)).ToList();

           return model;
        }

        public async Task<CartItemResponseDto> GetCartItemById(Guid id)
        {
            var cartItem = await _cartItemRepository.GetByIdAsync(id, CancellationToken.None);
            if (cartItem == null) 
            {
                throw new Exception("CartItem not found");
            }

            var model = MapToDto(cartItem);

            return model;
        }

        public async Task UpdateCartItem(Guid id, int quantity)
        {
            var cartItem = await _cartItemRepository.GetByIdAsync(id, CancellationToken.None);
            if (cartItem == null)
            {
                throw new Exception("CartItem not found");
            }
            cartItem = MapUpdateCartItem(cartItem, quantity);

            await _cartItemRepository.UpdateAsync(cartItem, CancellationToken.None);
        }

        private CartItem MapUpdateCartItem(CartItem cartItem, int quantity)
        {
            cartItem.Quantity = (int)(quantity != null ? quantity : cartItem.Quantity);
            cartItem.TotalPrice = CalculateTotalPrice(cartItem.UnitPrice, quantity);

            return cartItem;
        }

        public async Task DeleteCartItem(Guid id)
        {
            var cartItem = await _cartItemRepository.GetByIdAsync(id, CancellationToken.None);
            if (cartItem == null)
            {
                throw new Exception("CartItem not found");
            }

            await _cartItemRepository.DeleteAsync(cartItem, CancellationToken.None);
        }

        private decimal CalculateTotalPrice(decimal unitPrice, int quantity)
        {
            decimal totalPrice = unitPrice * quantity;

            return totalPrice;
        }

        private CartItemResponseDto MapToDto(CartItem cartItem)
        {
            return new CartItemResponseDto
            {
                Id = cartItem.Id,
                Quantity = cartItem.Quantity,
                UnitPrice = cartItem.Product.Price,
                TotalPrice = cartItem.TotalPrice,
                ProductId = cartItem.ProductId
            };
        }

        private CartItem MapToEntity(AddCartItemRequestDto addCartItemRequestDto)
        {
            return new CartItem
            {
                Quantity = addCartItemRequestDto.Quantity,
                ProductId = addCartItemRequestDto.ProductId
            };
        }
    }
}
