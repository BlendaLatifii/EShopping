using Application.DTO.Response;
using Application.Services.Interfaces;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class RoleService :  IRoleService
    {

        private readonly IRoleRepository _roleRepository;

        public RoleService(IRoleRepository roleRepository) 
        {
          _roleRepository = roleRepository;
        }

        public async Task<List<ListItemModel>> GetRoleSelectList()
        {
            var role = await _roleRepository.Query()
                .Select(x =>  new ListItemModel{ 
                   Id = x.Id,
                   Name = x.Name,
                }).ToListAsync();

            return role;
        }
    }
}
