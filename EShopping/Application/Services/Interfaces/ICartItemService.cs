using Application.DTO.Request;
using Application.DTO.Response;

namespace Application.Services.Interfaces
{
    public interface ICartItemService
    {
        Task AddCartItem(AddCartItemRequestDto addCartItemRequestDto);
        Task<List<CartItemResponseDto>> GetAllCartItems();
        Task<CartItemResponseDto> GetCartItemById(Guid id);
        Task UpdateCartItem(Guid id, int quantity);
        Task DeleteCartItem(Guid id);
        Task<int> CountCartItems();
    }
}
