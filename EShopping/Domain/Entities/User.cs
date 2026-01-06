using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    public class User : IdentityUser<Guid>
    {
        public string LastName { get; set; }
        public List<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}
