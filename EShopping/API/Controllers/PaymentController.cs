using Application.DTO.Request;
using Application.DTO.Response;
using Application.Services.Interfaces;
using Infrastructure.Repositories.Seeds;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {

        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddPayment(AddPaymentRequestDto addPaymentRequestDto)
        {
            await _paymentService.AddPayment(addPaymentRequestDto);

            return Ok();
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpGet]
        public async Task<ActionResult<List<PaymentResponseDto>>> GetAllPayments()
        {
            var result = await _paymentService.GetAllPayments();

            return Ok(result);
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentResponseDto>> GetPaymentById(Guid id)
        {
            var result = await _paymentService.GetPaymentById(id);

            return Ok(result);
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePayment(Guid id, UpdatePaymentRequestDto updatePaymentRequestDto)
        {
            await _paymentService.UpdatePayment(id, updatePaymentRequestDto);

            return Ok();
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePayment(Guid id)
        {
            await _paymentService.DeletePayment(id);

            return Ok();    
        }
    }
}
