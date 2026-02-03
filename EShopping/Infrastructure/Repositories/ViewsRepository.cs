using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;

namespace Infrastructure.Repositories
{
    public class ViewsRepository : GenericRepository<Views>, IViewsRepository
    {
        public ViewsRepository(AppDbContext context) : base(context)
        {
        }
    }
}
