using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ResetPasswordRepository : GenericRepository<UserResetPassword>, IResetPasswordRepository
    {

        public ResetPasswordRepository(AppDbContext appDbContext) : base(appDbContext) { }

        public async Task<UserResetPassword> GetUserByCode(string code)
        {
            var resetPass = await _dbSet.Include(u => u.User)
                .FirstOrDefaultAsync(u => u.Code == code);

            return resetPass;
        }
    }
}
