using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class RoleRepository : GenericRepository<Role>, IRoleRepository
    {

        public RoleRepository(AppDbContext appDbContext) : base(appDbContext)
        {

        }

        public async Task<bool> RoleExists(string roleName)
        {
            return await Query()
                .AnyAsync(x => x.Name == roleName);
        }

        public async Task<Role> GetRoleWithUserRoles(Guid id, CancellationToken cancellationToken)
        {
            return await _dbSet.Where(x => x.Id == id)
                .Include(x => x.UserRoles)
                .ThenInclude(x => x.User)
                .FirstAsync(cancellationToken);
        }
    }
}