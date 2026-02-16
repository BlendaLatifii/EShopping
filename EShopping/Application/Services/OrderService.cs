using Application.DTO.Response;
using Application.Services.Interfaces;
using Domain.Entities;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class OrderService : IOrderService
    {

        private readonly IOrderRepository _orderRepository;
        private readonly IIdentityService _identityService;

        public OrderService(IOrderRepository orderRepository, IIdentityService identityService) 
        {
            _orderRepository = orderRepository;
            _identityService = identityService;
        }

        public async Task<List<OrderResponseDto>> GetAllOrders()
        {
            var orders = await _orderRepository.GetAllAsync(CancellationToken.None);

            var model = orders.Select(x => MapToDto(x)).ToList();

            return model;
        }

        public async Task<OrderResponseDto> GetOrderOfUser()
        {
            var userId = _identityService.GetCurrentUserId();
            var order = await _orderRepository.GetOrderByUserId(userId);
            if (order == null)
            {
                return new OrderResponseDto
                {
                    OrderTime = DateTime.UtcNow,
                    TotalAmmount = 0,
                    Items = new List<OrderItemResponseDto>()
                };
            }

            var model = MapToDto(order);

            return model;
        }

        public async Task<OrderResponseDto> GetOrderById(Guid id)
        {
            var order = await _orderRepository.GetByIdAsync(id, CancellationToken.None);

            var model = MapToDto(order);

            return model;
        }

        public async Task DeleteOrder(Guid id)
        {
            var order = await _orderRepository.GetByIdAsync(id, CancellationToken.None);
            if(order == null)
            {
                throw new Exception("Order not found");
            }

            await _orderRepository.DeleteAsync(order, CancellationToken.None);
        }

        private OrderResponseDto MapToDto(Order order)
        {
            return new OrderResponseDto
            {
                Id = order.Id,
                OrderTime = order.OrderTime,
                Items = order.Items.Select(x => new OrderItemResponseDto
                {
                    ProductId = x.ProductId,
                    ProductName = x.Product.Name,
                    Quantity = x.Quantity,
                    TotalPrice = x.Product.Price * x.Quantity,
                }).ToList(),
                TotalAmmount = order.Items.Sum(x => (x.Product.Price * x.Quantity))
            };
        }

        public async Task<int> CountOrders()
        {
            var numberOfOrders = await _orderRepository.Query().CountAsync();

            return numberOfOrders;
        }

        public async Task<List<DailySalesDto>> GetDailySalesAsync()
        {
            return await _orderRepository.Query()
                .GroupBy(o => o.OrderTime.Date)
                .Select(g => new DailySalesDto
                {
                    Date = g.Key,
                    TotalSales = g.Sum(x => x.TotalAmount),
                    OrdersCount = g.Count()
                })
                .OrderBy(x => x.Date)
                .ToListAsync();
        }

    }
}
