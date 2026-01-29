using Application.DTO.Request;
using Application.DTO.Response;
using Application.Services.Interfaces;
using Domain.Entities;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Interfaces;
using Infrastructure.Repositories.Seeds;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace Application.Services
{
    public class AuthenticationService : IUserService, IAuthenticationService
    {

        private readonly IUserRepository _userRepository;
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IRoleRepository _roleRepository;
        private readonly IResetPasswordRepository _resetPasswordRepository;
        private readonly IIdentityService _identityService;


        public AuthenticationService(IUserRepository userRepository, UserManager<User> userManager, ITokenService tokenService, IRoleRepository roleRepository, IResetPasswordRepository resetPasswordRepository, IIdentityService identityService)
        {
            _userRepository = userRepository;
            _userManager = userManager;
            _tokenService = tokenService;
            _roleRepository = roleRepository;
            _resetPasswordRepository = resetPasswordRepository;
            _identityService = identityService;
        }

        public async Task<List<UserResponseDto>> GetAllAsync(CancellationToken cancellationToken)
        {
            var users = await _userRepository.GetUsersWithRole(cancellationToken);

            var userToReturn = users.Select(user => MapToUserResponseDto(user)).ToList();

            return userToReturn;
        }

        public async Task<UserResponseDto> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetUserWithRole(id, cancellationToken);
            if(user == null)
            {
                throw new Exception("User not found");
            }

            var userToReturn = MapToUserResponseDto(user);

            return userToReturn;
        }

        public async Task<UserResponseDto> GetUserDetail()
        {
            var userId = _identityService.GetCurrentUserId();

            var user = await _userRepository.GetUserByUserId(userId);
            if(user == null)
            {
                throw new Exception("User not found");
            }

            var model = MapToUserResponseDto(user);

            return model;
        }

        public async Task SignIn(SignInRequestDto userRequestDto)
        {
            var user = MapSignInUser(userRequestDto);

            user.UserRoles.Add(new UserRole() { RoleId = Roles.MemberId });

            var result = await _userManager.CreateAsync(user, userRequestDto.Password);
            if (!result.Succeeded)
            {
                throw new Exception();
            }
        }

        public async Task AddUser(AddUserRequestDto userRequestDto)
        {
            var user = MapUser(userRequestDto);
            var roleExists = await _roleRepository.GetByIdAsync(userRequestDto.RoleId, CancellationToken.None);
            if (roleExists == null)
            {
                throw new Exception("Role not found");
            }

            var result = await _userManager.CreateAsync(user, userRequestDto.Password);
            if (!result.Succeeded) 
            {
                throw new Exception("Can't create user");
            }
        }

        public async Task UpdateUser(Guid id, UpdateUserRequestDto updateUserRequestDto)
        {
            var user = await _userRepository.GetUserWithRole(id, CancellationToken.None);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            user = MapUpdateUserDto(user, updateUserRequestDto);

            if (updateUserRequestDto.RoleId.HasValue) 
            {
                user.UserRoles.Clear();
                user.UserRoles.Add(new UserRole { RoleId = (Guid)updateUserRequestDto.RoleId });
            }

            await _userRepository.UpdateAsync(user, CancellationToken.None);
        }

        private User MapUpdateUserDto(User user, UpdateUserRequestDto updateUserRequestDto)
        {
            user.UserName = updateUserRequestDto.UserName ?? user.UserName;
            user.LastName = updateUserRequestDto.LastName ?? user.LastName;
            user.Email = updateUserRequestDto.Email ?? user.Email;
            user.PhoneNumber = updateUserRequestDto.PhoneNumber ?? user.PhoneNumber;

            return user;
        }

        public async Task DeleteUser(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null) 
            {
                throw new Exception("User not found");
            }

            await _userRepository.DeleteAsync(user, CancellationToken.None);
        }

        public async Task<string> RequestResetPassword(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if(user == null)
            {
                throw new Exception("User not found");
            }

            var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
            var resetPasswordEntry = MapUserResetPassword(resetToken, user);

            await _resetPasswordRepository.AddAsync(resetPasswordEntry, CancellationToken.None);

            return resetPasswordEntry.Code;
        } 

        private UserResetPassword MapUserResetPassword(string code, User user)
        {
            return new UserResetPassword
            {
                Code = code,
                UserId = user.Id,
                ExpiresAt = DateTime.UtcNow.AddMinutes(10),
                IsUsed = false
            };
        }

        public async Task ResetPassword(ResetPasswordRequestDto resetPasswordRequestDto)
        {
            var resetPassword = await _resetPasswordRepository.GetUserByCode(resetPasswordRequestDto.Token);
            if (resetPassword == null) 
            {
                throw new Exception("Code not found");    
            }

            var user = resetPassword.User;
            if (user == null)
            {
                throw new Exception("User not found");
            }
            else if (resetPassword.ExpiresAt < DateTime.UtcNow)
            {
                throw new Exception("The code has expired");
            }
            else if (resetPassword.IsUsed)
            {
                throw new Exception("The code is used");
            }else
            {
                await _userManager.ResetPasswordAsync(user, resetPasswordRequestDto.Token, resetPasswordRequestDto.Password);

                resetPassword.IsUsed = true;
                await _resetPasswordRepository.UpdateAsync(resetPassword, CancellationToken.None);
            }
        }

        public async Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto)
        {
            var user = await _userRepository.GetUserByEmail(loginRequestDto.Email);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            if (!await _userManager.CheckPasswordAsync(user, loginRequestDto.Password)) 
            {
                throw new Exception("Incorrect password");
            }

            var tokenAndRefreshToken = GenerateTokenAndRefreshToken(user);
            await AddRefreshTokenToDb(tokenAndRefreshToken.RefreshToken);

            var userToReturn = MapToUser(user, tokenAndRefreshToken);

            return userToReturn;
        }

        public async Task<RefreshTokenResponseDto> RefreshToken(string refreshToken)
        {
            var oldRefreshToken = await GetAndValidateRefreshToken(refreshToken);

            var newTokenAndRefreshToken = GenerateTokenAndRefreshToken(oldRefreshToken.User);
            RevokeOldRefreshToken(oldRefreshToken);

            await AddNewRefreshTokenToDb(newTokenAndRefreshToken.RefreshToken);

            var refreshTokenToReturn = MapToRefreshToken(newTokenAndRefreshToken);

            return refreshTokenToReturn;
        }

        private async Task<RefreshToken> GetAndValidateRefreshToken(string refreshToken)
        {
            var refreshTokenToReturn = await _userRepository.GetAllRefreshTokenAsQueryable()
                .Include(x => x.User)
                    .ThenInclude(x => x.UserRoles)
                        .ThenInclude(x => x.Role)
                .FirstOrDefaultAsync(x => x.Token == refreshToken);

            if(refreshTokenToReturn == null)
            {
                throw new Exception("Refresh token not found");
            }
            else if(refreshTokenToReturn.Expires <= DateTime.UtcNow)
            {
                throw new Exception("Refresh token expired!");
            } else if( refreshTokenToReturn.Revoked != null)
            {
                throw new Exception("Refresh token not valid");
            }

            return refreshTokenToReturn;
        }

        private TokenAndRefreshTokenResponseDto GenerateTokenAndRefreshToken(User user)
        {
            var roles = user.UserRoles.Select(x => x.Role.Name).ToList();
            if(roles == null)
            {
                throw new Exception("Roles not found");
            }

            var token = _tokenService.GenerateToken(user, roles);
            var refreshToken = GenerateRefreshToken();
            refreshToken.UserId = user.Id;

            return new TokenAndRefreshTokenResponseDto
            {
                Token = token,
                RefreshToken = refreshToken
            };
        }

        private void RevokeOldRefreshToken(RefreshToken refreshToken)
        {
            refreshToken.Revoked = DateTime.UtcNow;
        }

        private RefreshToken GenerateRefreshToken()
        {
            return new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.UtcNow.AddDays(7),
                Created = DateTime.UtcNow
            };
        }

        private async Task AddRefreshTokenToDb(RefreshToken refreshToken)
        {
            await _userRepository.AddRefreshToken(refreshToken);
        }

        private async Task AddNewRefreshTokenToDb(RefreshToken refreshToken)
        {
            await _userRepository.AddRefreshToken(refreshToken);
        }

        private static UserResponseDto MapToUserResponseDto(User user)
        {
            return new UserResponseDto
            {
                Id =  user.Id,
                Email = user.Email,
                UserName = user.UserName,
                LastName = user.LastName,
                RoleName = user.UserRoles.FirstOrDefault()?.Role?.Name,
                PhoneNumber = user.PhoneNumber
            };
        }

        private User MapUser(AddUserRequestDto addUserRequestDto)
        {
            return new User
            {
                Email = addUserRequestDto.Email,
                UserName = addUserRequestDto.UserName,
                LastName = addUserRequestDto.LastName,
                PhoneNumber = addUserRequestDto.PhoneNumber,
                UserRoles = new List<UserRole>
                {
                    new UserRole
                    {
                        RoleId = addUserRequestDto.RoleId,
                    }
                }
            };
        }

        private User MapSignInUser(SignInRequestDto userRequestDto)
        {
            return new User
            {
                Email = userRequestDto.Email,
                UserName = userRequestDto.UserName,
                LastName = userRequestDto.LastName,
                PhoneNumber = userRequestDto.PhoneNumber,
            };
        }

        private static LoginResponseDto MapToUser(User user, TokenAndRefreshTokenResponseDto tokenAndRefreshTokenResponseDto)
        {
            return new LoginResponseDto
            {
                Id = user.Id,
                Email = user.Email,
                Token = tokenAndRefreshTokenResponseDto.Token,
                RefreshToken = tokenAndRefreshTokenResponseDto.RefreshToken.Token
            };
        }

        private RefreshTokenResponseDto MapToRefreshToken(TokenAndRefreshTokenResponseDto tokenAndRefreshTokenResponseDto)
        {
            return new RefreshTokenResponseDto
            {
              Token = tokenAndRefreshTokenResponseDto.Token,
               RefreshToken = tokenAndRefreshTokenResponseDto.RefreshToken.Token
            };
        }
    }
}
