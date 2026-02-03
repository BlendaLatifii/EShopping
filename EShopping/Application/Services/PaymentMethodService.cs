using Application.DTO.Request;
using Application.DTO.Response;
using Application.Services.Interfaces;
using Domain.Entities;
using Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class PaymentMethodService : IPaymentMethodService
    {

        private readonly IPaymentMethodRepository _paymentMethodRepository;
        
        public PaymentMethodService(IPaymentMethodRepository paymentMethodRepository) 
        {
            _paymentMethodRepository = paymentMethodRepository;
        }

        public async Task AddPaymentMethod(AddPaymentMethodRequestDto addPaymentMethodRequestDto)
        {
            var paymentMethod = MapToEntity(addPaymentMethodRequestDto);

            await _paymentMethodRepository.AddAsync(paymentMethod, CancellationToken.None);
        }

        public async Task<List<PaymentMethodResponseDto>> GetAllPaymentMethods()
        {
           var paymentMethods = await _paymentMethodRepository.GetAllAsync(CancellationToken.None);
            
           var model = paymentMethods.Select(x => MapToDto(x)).ToList();

           return model;
        }

        public async Task<PaymentMethodResponseDto> GetPaymentMethodById(Guid id)
        {
            var paymentMethod = await _paymentMethodRepository.GetByIdAsync(id, CancellationToken.None);
            if (paymentMethod == null) 
            {
                throw new Exception("PaymentMethod not found");
            }

            var model = MapToDto(paymentMethod);

            return model;
        }

        public async Task UpdatePaymentMethod(Guid id, UpdatePaymentMethodRequestDto updatePaymentMethodRequestDto)
        {
            var paymentMethod = await _paymentMethodRepository.GetByIdAsync(id, CancellationToken.None);
            if (paymentMethod == null)
            {
                throw new Exception("PaymentMethod not found");
            }

            paymentMethod = MapUpdatePaymentMethod(paymentMethod, updatePaymentMethodRequestDto);

            await _paymentMethodRepository.UpdateAsync(paymentMethod, CancellationToken.None);
        }

        private PaymentMethod MapUpdatePaymentMethod(PaymentMethod paymentMethod, UpdatePaymentMethodRequestDto updatePaymentMethodRequestDto)
        {
            paymentMethod.Name = updatePaymentMethodRequestDto.Name ?? paymentMethod.Name;

            return paymentMethod;
        }

        public async Task DeletePaymentMethod(Guid id)
        {
            var paymentMethod = await _paymentMethodRepository.GetByIdAsync(id, CancellationToken.None);
            if (paymentMethod == null)
            {
                throw new Exception("PaymentMethod not found");
            }

            await _paymentMethodRepository.DeleteAsync(paymentMethod, CancellationToken.None);
        }

        public async Task<List<ListItemModel>> GetPaymentMethodSelectList()
        {
            var paymentMethod = await _paymentMethodRepository.Query()
                .Select(x => new ListItemModel
                {
                    Id = x.Id,
                    Name = x.Name,
                }).ToListAsync();

            return paymentMethod;
        }

        private PaymentMethodResponseDto MapToDto(PaymentMethod paymentMethod)
        {
            return new PaymentMethodResponseDto
            {
                Id = paymentMethod.Id,
                Name = paymentMethod.Name,
            };
        }

        private PaymentMethod MapToEntity(AddPaymentMethodRequestDto addPaymentMethodRequestDto)
        {
            return new PaymentMethod
            {
                Name = addPaymentMethodRequestDto.Name,
            };
        }
    }
}
