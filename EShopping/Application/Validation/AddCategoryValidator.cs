using Application.DTO.Request;
using FluentValidation;

namespace Application.Validation
{
    public class AddCategoryValidator : AbstractValidator<AddCategoryRequestDto>
    {
        public AddCategoryValidator()
        {
           RuleFor(x => x.Name)
                .NotNull()
                .NotEmpty()
                .WithMessage("Name is Required");
        }
    }
}
