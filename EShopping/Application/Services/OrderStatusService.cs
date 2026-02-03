using Application.DTO.Request;
using Application.DTO.Response;
using Application.Services.Interfaces;
using Domain.Entities;
using Infrastructure.Repositories.Interfaces;

namespace Application.Services
{
    public class OrderStatusService : IOrderStatusService
    {

        private readonly IOrderStatusRepository _orderStatusRepository;

        public OrderStatusService(IOrderStatusRepository orderStatusRepository)
        {
          _orderStatusRepository = orderStatusRepository;
        }

        public async Task AddOrderStatus(AddOrderStatusRequestDto addOrderStatusRequestDto)
        {
            var allOrderStatuses = await _orderStatusRepository.GetAllAsync(CancellationToken.None);

            if(addOrderStatusRequestDto.DefaultStatus && allOrderStatuses.Any(o => o.DefaultStatus))
            {
                throw new Exception("Only one order is default status");
            }

            var orderStatus = MapToEntity(addOrderStatusRequestDto);

            await _orderStatusRepository.AddAsync(orderStatus, CancellationToken.None);
        }

        public async Task<List<OrderStatusResponseDto>> GetAllOrderStatuses()
        {
            var orderStatuses = await _orderStatusRepository.GetAllAsync(CancellationToken.None);

            var model = orderStatuses.Select(x => MapToDto(x)).ToList();

            return model;
        }

        public async Task<OrderStatusResponseDto> GetOrderStatusById(Guid id)
        {
            var orderStatus = await _orderStatusRepository.GetByIdAsync(id, CancellationToken.None);
            if (orderStatus == null) 
            {
                throw new Exception("OrderStatus not found");
            }

            var model = MapToDto(orderStatus);

            return model;
        }

        public async Task UpdateOrderStatus(Guid id, UpdateOrderStatusRequestDto updateOrderStatusRequestDto)
        {
            var orderStatus = await _orderStatusRepository.GetByIdAsync(id, CancellationToken.None);
            if (orderStatus == null)
            {
                throw new Exception("OrderStatus not found");
            }

            var allOrderStatuses = await _orderStatusRepository.GetAllAsync(CancellationToken.None);
            if (updateOrderStatusRequestDto.DefaultStatus && allOrderStatuses.Any(o => o.DefaultStatus))
            {
                throw new Exception("Only one order is default status");
            }

            orderStatus = MapUpdateOrderStatus(orderStatus, updateOrderStatusRequestDto);

            await _orderStatusRepository.UpdateAsync(orderStatus,CancellationToken.None);
        }

        private OrderStatus MapUpdateOrderStatus(OrderStatus orderStatus, UpdateOrderStatusRequestDto updateOrderStatusRequestDto)
        {
            orderStatus.Name = updateOrderStatusRequestDto.Name ?? orderStatus.Name;
            orderStatus.DefaultStatus = updateOrderStatusRequestDto.DefaultStatus;

            return orderStatus;
        }

        public async Task DeleteOrderStatus(Guid id)
        {
            var orderStatus = await _orderStatusRepository.GetByIdAsync(id, CancellationToken.None);
            if (orderStatus == null)
            {
                throw new Exception("OrderStatus not found");
            }

            await _orderStatusRepository.DeleteAsync(orderStatus,CancellationToken.None);
        }

        private OrderStatusResponseDto MapToDto(OrderStatus orderStatus)
        {
            return new OrderStatusResponseDto
            {
                Id = orderStatus.Id,
                Name = orderStatus.Name,
                DefaultStatus = orderStatus.DefaultStatus
            };
        }

        private OrderStatus MapToEntity(AddOrderStatusRequestDto entity)
        {
            return new OrderStatus
            {
                Name = entity.Name,
                DefaultStatus = entity.DefaultStatus,
            };
        }
    }
}
