using Application.DTO.Request;
using FluentValidation;

namespace Application.Validation
{
    public class AddOrderStatusValidator : AbstractValidator<AddOrderStatusRequestDto>
    {
        public AddOrderStatusValidator() 
        {
            RuleFor(x => x.Name)
                .NotNull()
                .NotEmpty()
                .WithMessage("Name is required");
        }
    }
}
