using Application.DTO.Response;

namespace Application.Services.Interfaces
{
    public interface IUserService
    {
        Task<List<UserResponseDto>> GetAllAsync(CancellationToken cancellationToken);
        Task<UserResponseDto> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    }
}