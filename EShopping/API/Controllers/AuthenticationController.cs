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
        private readonly IUserService _userService;
        private readonly IRoleService _roleService;

        public AuthenticationController(IAuthenticationService authenticationService, ICookieService cookieService, IUserService userService, IRoleService roleService)
        {
            _authenticationService = authenticationService;
            _cookieService = cookieService;
            _userService = userService;
            _roleService = roleService;
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

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser([FromRoute]Guid id, [FromBody]UpdateUserRequestDto updateUserRequestDto)
        {
            await _userService.UpdateUser(id, updateUserRequestDto);

            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<List<UserResponseDto>>> GetAll()
        {
            var result = await _userService.GetAllAsync(CancellationToken.None);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserResponseDto>> GetUserById(Guid id)
        {
            var result = await _userService.GetByIdAsync(id, CancellationToken.None);

            return Ok(result);
        }

        [HttpGet("user-profile")]
        public async Task<ActionResult<UserResponseDto>> GetUserDetail()
        {
            var result = await _userService.GetUserDetail();

            return Ok(result);
        }

        [HttpGet("get-role-select-list")]
        public async Task<ActionResult<List<ListItemModel>>> GetRoleSelectList()
        {
            var result = await _roleService.GetRoleSelectList();

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(Guid id)
        {
            await _userService.DeleteUser(id);

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
