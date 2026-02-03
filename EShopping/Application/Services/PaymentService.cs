using Application.DTO.Request;
using Application.DTO.Response;
using Application.Services.Interfaces;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Repositories.Interfaces;

namespace Application.Services
{
    public class PaymentService : IPaymentService
    {

        private readonly IPaymentRepository _paymentRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderStatusRepository _orderStatusRepository;
        private readonly ICartRepository _cartRepository;

        public PaymentService(IPaymentRepository paymentRepository, IOrderRepository orderRepository, IOrderStatusRepository orderStatusRepository, ICartRepository cartRepository)
        {
            _paymentRepository = paymentRepository;
            _orderRepository = orderRepository;
            _orderStatusRepository = orderStatusRepository;
            _cartRepository = cartRepository;
        }

        public async Task AddPayment(AddPaymentRequestDto addPaymentRequestDto)
        {
            var order = await _orderRepository
                     .GetByIdAsync(addPaymentRequestDto.OrderId, CancellationToken.None);
            if (order == null)
            {
                throw new Exception("Order not found");
            }

            if (addPaymentRequestDto.Amount <= 0 && addPaymentRequestDto.Amount != order.TotalAmount)
            {
                throw new Exception("Invalid payment amount");
            }

            var orderStatusId = await _orderStatusRepository.GetStatusThatIsNotDefault();
            order.OrderStatusId = orderStatusId;
            var cart = await _cartRepository.GetCartByUserId(order.UserId);
            cart.CartStatus = CartStatus.Checkout;
            
            var payment = MapToPayment(addPaymentRequestDto);

            await _paymentRepository.AddAsync(payment,CancellationToken.None);
        }

        public async Task<List<PaymentResponseDto>> GetAllPayments()
        {
            var payments = await _paymentRepository.GetAllWithPaymentMethods();

            var model = payments.Select(x => MapToPaymentDto(x)).ToList();

            return model;
        }

        public async Task<PaymentResponseDto> GetPaymentById(Guid id)
        {
            var payment = await _paymentRepository.GetByIdAsync(id, CancellationToken.None);
            if (payment == null)
            {
                throw new Exception("Payment not found");
            }

            var model = MapToPaymentDto(payment);

            return model;
        }

        public async Task UpdatePayment(Guid id, UpdatePaymentRequestDto updatePaymentRequestDto)
        {
            var payment = await _paymentRepository.GetPaymentWithPaymentMethods(id);
            if (payment == null)
            {
                throw new Exception("Payment not found");
            }

            payment = MapUpdatePayment(payment, updatePaymentRequestDto);

            await _paymentRepository.UpdateAsync(payment,CancellationToken.None);
        }

        public async Task DeletePayment(Guid id)
        {
            var payment = await _paymentRepository.GetByIdAsync(id, CancellationToken.None);
            if (payment == null)
            {
                throw new Exception("Payment not found");
            }

            await _paymentRepository.DeleteAsync(payment, CancellationToken.None);
        }

        private Payment MapUpdatePayment(Payment payment, UpdatePaymentRequestDto updatePaymentRequestDto)
        {
            payment.PaymentMethodId = updatePaymentRequestDto.PaymentMethodId ?? payment.PaymentMethodId;
            payment.Amount = updatePaymentRequestDto.Amount ?? payment.Amount;

            return payment;
        }

        private Payment MapToPayment(AddPaymentRequestDto paymentRequestDto)
        {
            return new Payment
            {
                OrderId = paymentRequestDto.OrderId,
                PaymentMethodId = paymentRequestDto.PaymentMethodId,
                TransactionDate = DateTime.UtcNow,
                Amount = paymentRequestDto.Amount,
            };
        }

        private PaymentResponseDto MapToPaymentDto(Payment payment) 
        {
            return new PaymentResponseDto
            {
                Id = payment.Id,
                PaymentMethodId = payment.PaymentMethodId, 
                PaymentMethodName = payment.PaymentMethod.Name,
                TransactionDate = payment.TransactionDate,
                Amount = payment.Amount
            };
        }
    }
}
