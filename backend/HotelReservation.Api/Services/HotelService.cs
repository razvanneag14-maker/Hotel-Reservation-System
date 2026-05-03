using HotelReservation.Api.Data;
using HotelReservation.Api.DTOs;
using HotelReservation.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace HotelReservation.Api.Services;

public class HotelService
{
    private readonly AppDbContext _context;

    public HotelService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<HotelDto>> SearchAsync(HotelSearchDto search)
    {
        var query = _context.Hoteluri
            .Include(h => h.Camere)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search.Destinatie))
            query = query.Where(h => h.Destinatie.Contains(search.Destinatie) || h.Locatie.Contains(search.Destinatie));

        if (!string.IsNullOrWhiteSpace(search.NumeHotel))
            query = query.Where(h => h.Nume.Contains(search.NumeHotel));

        if (!string.IsNullOrWhiteSpace(search.Masa) && search.Masa != "oricare")
            query = query.Where(h => h.TipMasa.Contains(search.Masa));

        if (search.Stele.HasValue)
            query = query.Where(h => h.Stele == search.Stele.Value);

        if (!string.IsNullOrWhiteSpace(search.Facilitati))
            query = query.Where(h => h.Facilitati.Contains(search.Facilitati));

        if (!string.IsNullOrWhiteSpace(search.CategorieOferta) && search.CategorieOferta != "toate")
            query = query.Where(h => h.CategorieOferta.Contains(search.CategorieOferta));

        if (!string.IsNullOrWhiteSpace(search.TipUnitate) && search.TipUnitate != "oricare")
            query = query.Where(h => h.TipUnitate.Contains(search.TipUnitate));

        var hotels = await query.ToListAsync();

        var checkIn = search.Data ?? DateTime.Today;
        var checkOut = checkIn.AddDays(search.Nopti ?? 7);

        return hotels.Select(h => new HotelDto
        {
            Id = h.Id,
            Nume = h.Nume,
            Destinatie = h.Destinatie,
            Locatie = h.Locatie,
            Descriere = h.Descriere,
            Facilitati = h.Facilitati,
            TipMasa = h.TipMasa,
            TipUnitate = h.TipUnitate,
            CategorieOferta = h.CategorieOferta,
            ImagineUrl = h.ImagineUrl,
            Scor = h.Scor,
            NumarComentarii = h.NumarComentarii,
            Stele = h.Stele,
            MetriDePlaja = h.MetriDePlaja,
            Status = h.Status,
            Camere = h.Camere
                .Where(c => h.AcceptaRezervari() && c.EsteDisponibila(checkIn, checkOut))
                .Select(c => new CameraDto
                {
                    Id = c.Id,
                    Numar = c.Numar,
                    Etaj = c.Etaj,
                    TipCamera = c.TipCamera,
                    Disponibila = c.EsteDisponibila(checkIn, checkOut),
                    PretPeNoapte = c.PretPeNoapte,
                    DescriereOferta = c.DescriereOferta
                }).ToList()
        }).ToList();
    }

    public async Task<HotelDto?> GetByIdAsync(int id)
    {
        var result = await SearchAsync(new HotelSearchDto());
        return result.FirstOrDefault(h => h.Id == id);
    }

    public async Task<bool> UpdateHotelAsync(int id, UpdateHotelDto dto)
    {
        var hotel = await _context.Hoteluri.FindAsync(id);
        if (hotel == null) return false;

        hotel.Nume = dto.Nume;
        hotel.Destinatie = dto.Destinatie;
        hotel.Locatie = dto.Locatie;
        hotel.Descriere = dto.Descriere;
        hotel.Facilitati = dto.Facilitati;
        hotel.TipMasa = dto.TipMasa;
        hotel.TipUnitate = dto.TipUnitate;
        hotel.CategorieOferta = dto.CategorieOferta;
        hotel.ImagineUrl = dto.ImagineUrl;
        hotel.Stele = dto.Stele;
        hotel.Status = dto.Status;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ChangeStatusAsync(int id, StatusHotel status)
    {
        var hotel = await _context.Hoteluri.FindAsync(id);
        if (hotel == null) return false;

        hotel.Status = status;
        await _context.SaveChangesAsync();
        return true;
    }
}
