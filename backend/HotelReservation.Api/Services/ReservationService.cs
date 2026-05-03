using HotelReservation.Api.Data;
using HotelReservation.Api.DTOs;
using HotelReservation.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace HotelReservation.Api.Services;

public class ReservationService
{
    private readonly AppDbContext _context;

    public ReservationService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ReservationResponseDto> CreateReservationAsync(CreateReservationDto dto)
    {
        var camera = await _context.Camere
            .Include(c => c.Rezervari)
            .FirstOrDefaultAsync(c => c.Id == dto.CameraId);

        if (camera == null)
            throw new ArgumentException("Camera nu exista.");

        var client = await _context.Clienti.FindAsync(dto.ClientId);
        if (client == null)
            throw new ArgumentException("Clientul nu exista.");

        var checkIn = dto.DataCheckIn;
        var checkOut = dto.DataCheckIn.AddDays(dto.Nopti <= 0 ? 1 : dto.Nopti);

        if (!camera.EsteDisponibila(checkIn, checkOut))
            throw new InvalidOperationException("Camera nu este disponibila pentru perioada selectata.");

        var nopti = Math.Max(1, dto.Nopti);

        var rezervare = new Rezervare
        {
            ClientId = dto.ClientId,
            CameraId = dto.CameraId,
            DataCheckIn = checkIn,
            DataCheckOut = checkOut,
            Nopti = nopti,
            Adulti = dto.Adulti,
            Copii = dto.Copii,
            Status = StatusRezervare.Confirmata,
            PretTotal = nopti * camera.PretPeNoapte,
            Turisti = dto.Turisti.Select(t => new Turist
            {
                Nume = t.Nume,
                Prenume = t.Prenume,
                CNP = t.CNP,
                Varsta = t.Varsta
            }).ToList()
        };

        _context.Rezervari.Add(rezervare);
        await _context.SaveChangesAsync();

        return new ReservationResponseDto
        {
            Id = rezervare.Id,
            Status = rezervare.Status.ToString(),
            PretTotal = rezervare.PretTotal
        };
    }
}
