using Domain.Entities;

namespace Infrastructure.Repositories.Interfaces
{
    public interface IResetPasswordRepository : IGenericRepository<UserResetPassword>
    {
        Task<UserResetPassword> GetUserByCode(string code);
    }
}
