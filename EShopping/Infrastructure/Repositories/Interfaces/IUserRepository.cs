using Domain.Entities;

namespace Infrastructure.Repositories.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        public Task<List<User>> GetUsersWithRole(CancellationToken cancellationToken);
        Task<User> GetUserWithRole(Guid id, CancellationToken cancellationToken);
        Task AddRefreshToken(RefreshToken refreshToken);
        Task<User> GetUserByEmail(string email);
        IQueryable<RefreshToken> GetAllRefreshTokenAsQueryable();
    }
}
