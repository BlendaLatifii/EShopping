using API.Constants;
using Application.DTO.Request;
using Application.DTO.Response;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {

        private readonly IAuthenticationService _authenticationService;
        private readonly ICookieService _cookieService;

        public AuthenticationController(IAuthenticationService authenticationService, ICookieService cookieService)
        {
            _authenticationService = authenticationService;
            _cookieService = cookieService;
        }


        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginRequestDto loginRequestDto)
        {
            var result = await _authenticationService.Login(loginRequestDto);

            return Ok(result);
        }

        [HttpPost("signin")]
        public async Task<ActionResult> SignIn(SignInRequestDto userRequestDto)
        {
            await _authenticationService.SignIn(userRequestDto);

            return Ok();
        }

        [HttpPost("add-user")]
        public async Task<ActionResult> AddUser(AddUserRequestDto userRequestDto)
        {
            await _authenticationService.AddUser(userRequestDto);

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("request-reset-password")]
        public async Task<ActionResult<string>> RequestResetPassword(string email)
        {
          var result =  await _authenticationService.RequestResetPassword(email);

           return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("reset-password")]
        public async Task<ActionResult> ResetPassword(ResetPasswordRequestDto resetPasswordRequestDto)
        {
            await _authenticationService.ResetPassword(resetPasswordRequestDto);

            return Ok();
        }

        [HttpPost("refreshToken")]
        public async Task<ActionResult<RefreshTokenResponseDto>> RefreshToken()
        {
            var result = await _authenticationService.RefreshToken(_cookieService.Get(CookieNames.RefreshToken));

            return Ok(result);
        }
    }
}
