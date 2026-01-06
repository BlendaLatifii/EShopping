using Infrastructure.Data;

namespace Infrastructure.Repositories.Seeds
{
    public static class DbInitializer
    {
        public static async Task SeedAsync(IRoleRepository roleRepository, AppDbContext appDbContext)
        {
            foreach(var role in SeedRoles.SeedRole())
            {
                if(!await roleRepository.RoleExists(role.Name))
                {
                    await roleRepository.AddAsync(role, CancellationToken.None);
                }
            }
        }
    }
}
