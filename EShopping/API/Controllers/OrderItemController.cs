using Application.DTO.Response;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemController : ControllerBase
    {

        private readonly IOrderItemService _orderItemService;

        public OrderItemController(IOrderItemService ovederItemService)
        {
            _orderItemService = ovederItemService;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderItemResponseDto>>> GetAllOrderItems()
        {
            var result = await _orderItemService.GetAllOrderItems();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderItemResponseDto>> GetOrderItemById(Guid id)
        {
            var result = await _orderItemService.GetOrderItemById(id);

            return Ok(result);  
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOrderItem(Guid id)
        {
            await _orderItemService.DeleteOrderItem(id);

            return Ok();
        }
    }
}
