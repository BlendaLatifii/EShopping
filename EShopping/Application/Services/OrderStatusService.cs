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

            await _orderStatusRepository.UpdateAsync(orderStatus,CancellationToken.None);
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
                Name = orderStatus.Name
            };
        }

        private OrderStatus MapToEntity(AddOrderStatusRequestDto entity)
        {
            return new OrderStatus
            {
                Name = entity.Name,
            };
        }
    }
}
