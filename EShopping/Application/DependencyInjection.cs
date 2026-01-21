using Application.Services;
using Application.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Application
{
    public static class DependencyInjection
    {

        public static async void AddApplication(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IOrderStatusService, OrderStatusService>();
            services.AddScoped<IPaymentMethodService, PaymentMethodService>();
            services.AddScoped<ICartItemService, CartItemService>();
            services.AddScoped<ICartService, CartService>();
            services.AddScoped<IIdentityService, IdentityService>();
            services.AddScoped<ICookieService, CookieService>();
            services.AddScoped<IOrderItemService, OrderItemService>();
            services.AddScoped<IOrderService, OrderService>();
        }
    }
}
