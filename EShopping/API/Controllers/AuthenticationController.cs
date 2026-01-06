using Application.DTO.Request;
using Application.Services.Interfaces;
using Infrastructure.Repositories.Seeds;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {

        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
          _authenticationService = authenticationService;
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

    }
}
