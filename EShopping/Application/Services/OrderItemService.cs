using Application.DTO.Response;
using Application.Services.Interfaces;
using Domain.Entities;
using Infrastructure.Repositories.Interfaces;

namespace Application.Services
{
    public class OrderItemService : IOrderItemService
    {
        
        private readonly IOrderItemRepository _orderItemRepository;
        private readonly IIdentityService _identityService;
        private readonly IOrderRepository _orderRepository;

        public OrderItemService(IOrderItemRepository orderItemRepository, IIdentityService identityService, IOrderRepository orderRepository)
        {
            _orderItemRepository = orderItemRepository;
            _identityService = identityService;
            _orderRepository = orderRepository;
        }

        public async Task AddOrderItem(int quantity, Guid productId)
        {
            var userId = _identityService.GetCurrentUserId();
            var order = await _orderRepository.GetOrderByUserId(userId);

            if (order == null)
            {
                order = new Order
                {
                    UserId = userId
                };

                await _orderRepository.AddAsync(order, CancellationToken.None);
            }

            var orderItem = MapToEntity(quantity,productId);
            orderItem.OrderId = order.Id;

            await _orderItemRepository.AddAsync(orderItem, CancellationToken.None);
        }

        public async Task DeleteOrderItem(Guid id)
        {
            var orderItem = await _orderItemRepository.GetByIdAsync(id, CancellationToken.None);
            if (orderItem == null) 
            {
                throw new Exception("OrderItem not found");
            }

            await _orderItemRepository.DeleteAsync(orderItem, CancellationToken.None);
        }

        public async Task UpdateOrderItem(Guid id, int quantity)
        {
            var orderItem = await _orderItemRepository.GetByIdAsync(id, CancellationToken.None);
            if(orderItem == null)
            {
                throw new Exception("Order item not found");
            }

            orderItem = MapUpdateOrderItem(orderItem, quantity);

            await _orderItemRepository.UpdateAsync(orderItem, CancellationToken.None);
        }

        public OrderItem MapUpdateOrderItem(OrderItem orderItem, int quantity)
        {
            orderItem.Quantity = (int)(quantity != null ? quantity : orderItem.Quantity);
            orderItem.TotalPrice = CalculateTotalPrice(orderItem.Product.Price, quantity);

            return orderItem;
        }

        private decimal CalculateTotalPrice(decimal unitPrice, int quantity)
        {
            decimal totalPrice = unitPrice * quantity;

            return totalPrice;
        }

        public async Task<List<OrderItemResponseDto>> GetAllOrderItems()
        {
            var orderItems = await _orderItemRepository.GetOrderItems();

            var model = orderItems.Select(x => MapToDto(x)).ToList();

            return model;
        }

        public async Task<OrderItemResponseDto> GetOrderItemById(Guid id)
        {
            var orderItem = await _orderItemRepository.GetOrderById(id);
            if (orderItem == null)
            {
                throw new Exception("OrderItem not found");
            }

             var model = MapToDto(orderItem);

            return model;
        }

        private OrderItemResponseDto MapToDto(OrderItem orderItem)
        {
            return new OrderItemResponseDto
            {
                ProductId = orderItem.ProductId,
                ProductName = orderItem.Product.Name,
                Quantity = orderItem.Quantity,
                TotalPrice = orderItem.TotalPrice
            };
        }

        private OrderItem MapToEntity(int quantity, Guid productId)
        {
            return new OrderItem
            {
                Quantity = quantity,
                ProductId = productId,
            };
        }
    }
}
