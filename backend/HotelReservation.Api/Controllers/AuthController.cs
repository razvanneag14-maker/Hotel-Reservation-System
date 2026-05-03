using HotelReservation.Api.DTOs;
using HotelReservation.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotelReservation.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _authService.LoginAsync(dto);
        return user == null ? Unauthorized("Email sau parola incorecta.") : Ok(user);
    }
}
