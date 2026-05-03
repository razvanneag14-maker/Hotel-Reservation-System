using HotelReservation.Api.Data;
using HotelReservation.Api.DTOs;
using Microsoft.EntityFrameworkCore;

namespace HotelReservation.Api.Services;

public class AuthService
{
    private readonly AppDbContext _context;

    public AuthService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<LoginResponseDto?> LoginAsync(LoginDto dto)
    {
        var client = await _context.Clienti.FirstOrDefaultAsync(c => c.Email == dto.Email && c.Parola == dto.Parola);
        if (client != null)
        {
            return new LoginResponseDto { Id = client.Id, Nume = client.Nume, Email = client.Email, Rol = "client" };
        }

        var admin = await _context.Administratori.FirstOrDefaultAsync(a => a.Email == dto.Email && a.Parola == dto.Parola);
        if (admin != null)
        {
            return new LoginResponseDto { Id = admin.Id, Nume = admin.Nume, Email = admin.Email, Rol = "admin" };
        }

        return null;
    }
}
