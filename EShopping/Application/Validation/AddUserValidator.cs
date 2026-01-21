using Application.DTO.Request;
using FluentValidation;

namespace Application.Validation
{
    public class AddUserValidator : AbstractValidator<AddUserRequestDto>
    {
        public AddUserValidator()
        {
            RuleFor(x => x.UserName)
                .NotNull()
                .NotEmpty()
                .WithMessage("UserName is Required");

            RuleFor(x => x.Email)
                .NotNull()
                .NotEmpty()
                .WithMessage("Email is Required");

            RuleFor(x => x.LastName)
                .NotNull()
                .NotEmpty()
                .WithMessage("LastName is Required");
        }
    }
}
