using Domain.Entities;

namespace Infrastructure.Repositories.Seeds
{
    public static class SeedRoles
    {
        public static List<Role> SeedRole()
        {
            var roles = new List<Role>
            {
                new Role
                {
                    Id = Roles.AdminId,
                    Name = Roles.Admin,
                    ConcurrencyStamp = "1",
                    NormalizedName = Roles.Admin.ToUpper()
                },
                new Role
                {
                    Id = Roles.MemberId,
                    Name = Roles.Member,
                    ConcurrencyStamp = "2",
                    NormalizedName = Roles.Member.ToUpper()
                }
            };

            return roles;
        }
    }
}
