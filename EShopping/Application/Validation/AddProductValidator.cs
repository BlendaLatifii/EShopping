using Application.DTO.Request;
using FluentValidation;

namespace Application.Validation
{
    public class AddProductValidator : AbstractValidator<AddProductRequestDto>
    {

        public AddProductValidator() 
        {
            RuleFor(x => x.Name)
                .NotNull()
                .NotEmpty()
                .WithMessage("Name is Required");

            RuleFor(x => x.Description)
                .NotNull()
                .NotEmpty()
                .WithMessage("Description is Required");

            RuleFor(x => x.CategoryId)
               .NotNull()
               .NotEmpty()
               .WithMessage("CategoryId is Required");

            RuleFor(x => x.Price)
                .GreaterThan(0)
                .WithMessage("Price should be grater than price");
        }
    }
}
