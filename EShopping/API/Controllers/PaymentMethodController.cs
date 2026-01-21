using Application.DTO.Request;
using Application.DTO.Response;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentMethodController : ControllerBase
    {

        private readonly IPaymentMethodService _paymentMethodService;

        public PaymentMethodController(IPaymentMethodService paymentMethodService) 
        {
            _paymentMethodService = paymentMethodService;    
        }

        [HttpPost]
        public async Task<ActionResult> AddPaymentMethod(AddPaymentMethodRequestDto addOrderStatusRequestDto)
        {
            await _paymentMethodService.AddPaymentMethod(addOrderStatusRequestDto);

            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<List<PaymentMethodResponseDto>>> GetAllPaymentMethods()
        {
            var result = await _paymentMethodService.GetAllPaymentMethods();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentMethodResponseDto>> GetPaymentMethodById(Guid id)
        {
            var result = await _paymentMethodService.GetPaymentMethodById(id);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePaymentMethod([FromRoute]Guid id, [FromBody] UpdatePaymentMethodRequestDto updatePaymentMethodRequestDto)
        {
            await _paymentMethodService.UpdatePaymentMethod(id, updatePaymentMethodRequestDto);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePaymentMethod(Guid id)
        {
            await _paymentMethodService.DeletePaymentMethod(id);

            return Ok();
        }
    }
}
