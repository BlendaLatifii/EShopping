using Application.DTO.Request;
using FluentValidation;

namespace Application.Validation
{
    public class AddPaymentMethodValidator : AbstractValidator<AddPaymentMethodRequestDto>
    {
        public AddPaymentMethodValidator()
        {
            RuleFor(x => x.Name)
             .NotNull()
             .NotEmpty()
             .WithMessage("Name is Required");
        }
    }
}
