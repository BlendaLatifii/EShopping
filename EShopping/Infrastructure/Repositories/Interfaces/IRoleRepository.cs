using Domain.Entities;
using Infrastructure.Repositories.Interfaces;

namespace Infrastructure.Repositories
{
    public interface IRoleRepository : IGenericRepository<Role>
    {
        Task<bool> RoleExists(string? name);

        Task<Role> GetRoleWithUserRoles(Guid id, CancellationToken cancellationToken);
    }
}
