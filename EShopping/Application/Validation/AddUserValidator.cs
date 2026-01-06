using Application.DTO.Request;
using FluentValidation;

namespace Application.Validation
{
    public class AddUserValidator : AbstractValidator<AddUserRequestDto>
    {
        public AddUserValidator()
        {

        }
    }
}
