using Application.DTO.Response;

namespace Application.Services.Interfaces
{
    public interface IRoleService
    {
        Task<List<ListItemModel>> GetRoleSelectList();
    }
}
