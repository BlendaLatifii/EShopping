using Application.DTO.Response;

namespace Application.Services.Interfaces
{
    public interface ICartService
    {
       Task<CartDto> GetCartAsync(Guid userId);
       Task AddToCartAsync(Guid userId, Guid productId, int quantity);
    }
}
