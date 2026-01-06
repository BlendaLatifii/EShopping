using Application.DTO.Request;
using Application.DTO.Response;

namespace Application.Services.Interfaces
{
    public interface IAuthenticationService
    {
        Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto);
        Task<RefreshTokenResponseDto> RefreshToken(string refreshToken);
        Task SignIn(SignInRequestDto userRequestDto);
        Task AddUser(AddUserRequestDto userRequestDto);
        Task<string> RequestResetPassword(string email);
        Task ResetPassword(ResetPasswordRequestDto resetPasswordRequestDto);
    }
}
