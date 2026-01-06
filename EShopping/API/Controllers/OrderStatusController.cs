using Application.DTO.Request;
using Application.DTO.Response;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderStatusController : ControllerBase
    {

        private readonly IOrderStatusService _orderStatusService;

        public OrderStatusController(IOrderStatusService orderStatusService) 
        {
            _orderStatusService = orderStatusService;    
        }

        [HttpPost]
        public async Task<ActionResult> AddOrderStatus(AddOrderStatusRequestDto addOrderStatusRequestDto)
        {
            await _orderStatusService.AddOrderStatus(addOrderStatusRequestDto);

            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderStatusResponseDto>>> GetAllOrderStatuses()
        {
            var result = await _orderStatusService.GetAllOrderStatuses();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderStatusResponseDto>> GetOrderStatusById(Guid id)
        {
            var result = await _orderStatusService.GetOrderStatusById(id);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateOrderStatus([FromRoute]Guid id, [FromBody]UpdateOrderStatusRequestDto updateOrderStatusRequestDto)
        {
            await _orderStatusService.UpdateOrderStatus(id, updateOrderStatusRequestDto);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOrderStatus(Guid id)
        {
            await _orderStatusService.DeleteOrderStatus(id);

            return Ok();
        }
    }
}
