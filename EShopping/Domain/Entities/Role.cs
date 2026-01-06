using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    public class Role : IdentityRole<Guid>
    {
        public List<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}
