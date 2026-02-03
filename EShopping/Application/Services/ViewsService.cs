using Application.DTO.Request;
using Application.DTO.Response;
using Application.Services.Interfaces;
using Domain.Entities;
using Infrastructure.Repositories.Interfaces;

namespace Application.Services
{
    public class ViewsService : IViewsService
    {

        private readonly IViewsRepository _viewsRepository;
        private readonly IIdentityService _identityService;

        public ViewsService(IViewsRepository viewsRepository, IIdentityService identityService)
        {
            _viewsRepository = viewsRepository;
            _identityService = identityService;
        }

        public async Task<List<ProductResponseDto>> RecommendProducts(List<Product> allProducts,List<Views> interactions)
        {
            Guid userId = _identityService.GetCurrentUserId();

            var products = new List<ProductResponseDto>();

            return products;
        }
    }
}
