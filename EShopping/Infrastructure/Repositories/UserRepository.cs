using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        protected readonly AppDbContext _context;
        public UserRepository(AppDbContext context) : base(context)
        {
             _context = context;
        }

        public async Task<List<User>> GetUsersWithRole(CancellationToken cancellationToken)
        {
            return await _dbSet
                .Include(x => x.UserRoles)
                .ThenInclude(x => x.Role)
                .ToListAsync(cancellationToken);
        }

        public async Task<User> GetUserWithRole(Guid id, CancellationToken cancellationToken)
        {
            return await _dbSet
                .Where(x => x.Id == id)
                .Include(x => x.UserRoles)
                .ThenInclude(x => x.Role)
                .FirstAsync(cancellationToken);
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _dbSet
                .Where(x => x.Email == email)
                .Include(x => x.UserRoles)
                .ThenInclude(x => x.Role)
                .FirstAsync();
        }

        public async Task AddRefreshToken(RefreshToken refreshToken)
        {
            _context.RefreshTokens.Add(refreshToken);
            await _context.SaveChangesAsync();
        }

        public IQueryable<RefreshToken> GetAllRefreshTokenAsQueryable() => _context.RefreshTokens;
    }
}
