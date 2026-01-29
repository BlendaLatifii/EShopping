using Application.DTO.Response;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {

        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderResponseDto>>> GetAllOrders()
        {
            var result = await _orderService.GetAllOrders();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderResponseDto>> GetOrderById(Guid id)
        {
            var result = await _orderService.GetOrderById(id);

            return Ok(result);
        }

        [HttpGet("order-of-user")]
        public async Task<ActionResult<OrderResponseDto>> GetOrderOfUser()
        {
            var result = await _orderService.GetOrderOfUser();

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOrder(Guid id)
        {
            await _orderService.DeleteOrder(id);

            return Ok();
        }
    }
}
