using Application.DTO.Request;
using Application.DTO.Response;
using Application.Services.Interfaces;
using Domain.Entities;
using Infrastructure.Repositories.Interfaces;
using Microsoft.Identity.Client;

namespace Application.Services
{
    public class CartItemService : ICartItemService
    {

        private readonly ICartItemRepository _cartItemRepository;
        private readonly ICartRepository _cartRepository;
        private readonly IIdentityService _identityService;
        private readonly IOrderItemService _orderItemService;
        private readonly IOrderRepository _orderRepository;

        public CartItemService(ICartItemRepository cartItemRepository, ICartRepository cartRepository, IIdentityService identityService, IOrderItemService orderItemService, IOrderRepository orderRepository) 
        {
            _cartItemRepository = cartItemRepository;
            _cartRepository = cartRepository;
            _identityService = identityService;
            _orderItemService = orderItemService;
            _orderRepository = orderRepository;
        }

        public async Task AddCartItem(AddCartItemRequestDto addCartItemRequestDto)
        {
            var userId = _identityService.GetCurrentUserId();
            var cart = await _cartRepository.GetCartByUserId(userId);

            if (cart == null)
            {
                cart = new Cart
                {
                    UserId = userId
                };

                await _cartRepository.AddAsync(cart, CancellationToken.None);
            }

            var existingItem = await _cartItemRepository
                 .GetByCartIdAndProductId(cart.Id, addCartItemRequestDto.ProductId);

            if (existingItem != null)
            {
                throw new Exception("This product exist , edit it in cart page.");
            }

            var cartItem = MapToEntity(addCartItemRequestDto);
            cartItem.CartId = cart.Id;

            await _cartItemRepository.AddAsync(cartItem, CancellationToken.None);
            await _orderItemService.AddOrderItem(cartItem.Quantity, cartItem.ProductId);
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
            var userId = _identityService.GetCurrentUserId();
            var cartItem = await _cartItemRepository.GetByIdAsync(id, CancellationToken.None);
            if (cartItem == null)
            {
                throw new Exception("CartItem not found");
            }

            cartItem = MapUpdateCartItem(cartItem, quantity);

            await _cartItemRepository.UpdateAsync(cartItem, CancellationToken.None);

            var order = await _orderRepository.GetOrderByUserId(userId);
            if(order == null)
            {
                throw new Exception("This order doesn't exists");
            }

            var orderItem = order.Items.FirstOrDefault(x => x.ProductId == cartItem.ProductId);
            await _orderItemService.UpdateOrderItem(orderItem.Id, quantity);
        }

        private CartItem MapUpdateCartItem(CartItem cartItem, int quantity)
        {
            cartItem.Quantity = (int)(quantity != null ? quantity : cartItem.Quantity);
            cartItem.TotalPrice = CalculateTotalPrice(cartItem.Product.Price, quantity);

            return cartItem;
        }

        //kur te fshihet prej cartitem me u fshi edhe prej order 
        public async Task DeleteCartItem(Guid id)
        {
            var userId = _identityService.GetCurrentUserId();
            var cartItem = await _cartItemRepository.GetByIdAsync(id, CancellationToken.None);
            if (cartItem == null)
            {
                throw new Exception("CartItem not found");
            }

            await _cartItemRepository.DeleteAsync(cartItem, CancellationToken.None);
            var order = await _orderRepository.GetOrderByUserId(userId);
            var orderItem = order.Items.FirstOrDefault(x => x.ProductId == cartItem.ProductId);

            await _orderItemService.DeleteOrderItem(orderItem.Id);
        }

        public async Task<int> CountCartItems()
        {
            Guid userId = _identityService.GetCurrentUserId();
            var cart = await _cartRepository.GetCartByUserId(userId);
            if(cart == null)
            {
                return 0;
            }

            int cartItems = cart.CartItems.Count;

            return cartItems;
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
                ProductId = addCartItemRequestDto.ProductId,
            };
        }
    }
}
