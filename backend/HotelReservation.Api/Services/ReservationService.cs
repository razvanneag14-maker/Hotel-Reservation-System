using HotelReservation.Api.Data;
using HotelReservation.Api.DTOs;
using HotelReservation.Api.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            .Include(c => c.Hotel)
            .Include(c => c.Rezervari)
            .FirstOrDefaultAsync(c => c.Id == dto.CameraId);

        if (camera == null)
            throw new ArgumentException("Camera nu exista.");

        if (camera.Hotel != null && !camera.Hotel.AcceptaRezervari())
            throw new InvalidOperationException("Hotelul este inchis sau in renovare.");

        var client = await _context.Clienti.FindAsync(dto.ClientId);
        if (client == null)
            throw new ArgumentException("Clientul nu exista.");

        var checkIn = dto.DataCheckIn.Date;
        var checkOut = dto.DataCheckOut.Date;

        if (checkOut <= checkIn)
            throw new ArgumentException("Data de check-out trebuie sa fie dupa check-in.");

        if (!camera.EsteDisponibila(checkIn, checkOut))
            throw new InvalidOperationException("Camera nu este disponibila pentru perioada selectata.");

        var nopti = (checkOut - checkIn).Days;
        var pretTotal = nopti * camera.PretPeNoapte;

        var rezervare = new Rezervare
        {
            ClientId = dto.ClientId,
            CameraId = dto.CameraId,
            DataCheckIn = checkIn,
            DataCheckOut = checkOut,
            Nopti = nopti,
            Adulti = dto.Adulti,
            Copii = dto.Copii,
            Status = StatusRezervare.InAsteptare,
            PretTotal = pretTotal,
            Turisti = dto.Turisti.Select(t => new Turist
            {
                Nume = t.Nume,
                Prenume = t.Prenume,
                CNP = t.CNP,
                Varsta = t.Varsta
            }).ToList()
        };

        _context.Rezervari.Add(rezervare);

        var nouaPlata = new Plata
        {
            Suma = pretTotal,
            TipPlata = TipPlata.Card,
            EsteEfectuata = false,
            Rezervare = rezervare
        };

        _context.Plati.Add(nouaPlata);
        await _context.SaveChangesAsync();

        return new ReservationResponseDto
        {
            Id = rezervare.Id,
            Status = rezervare.Status.ToString(),
            PretTotal = rezervare.PretTotal
        };
    }

    

    public async Task<List<Rezervare>> GetReservationsByRoleAsync(string role, int userId)
    {
        
        if (role == UserRole.Administrator.ToString())
        {
            return await _context.Rezervari
                .Include(r => r.Camera)
                .Include(r => r.Client)
                .Include(r => r.Turisti)
                .ToListAsync();
        }

        
        return await _context.Rezervari
            .Where(r => r.ClientId == userId)
            .Include(r => r.Camera)
            .Include(r => r.Turisti)
            .ToListAsync();
    }

    public async Task<bool> CancelReservationAsync(int reservationId, string role, int userId)
    {
        var rezervare = await _context.Rezervari.FindAsync(reservationId);

        if (rezervare == null) return false;

        
        if (role != UserRole.Administrator.ToString() && rezervare.ClientId != userId)
        {
            throw new UnauthorizedAccessException("Nu aveți permisiunea de a anula această rezervare.");
        }

        rezervare.Status = StatusRezervare.Anulata;

        

        await _context.SaveChangesAsync();
        return true;
    }
}