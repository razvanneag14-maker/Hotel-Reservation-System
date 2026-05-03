using HotelReservation.Api.DTOs;
using HotelReservation.Api.Models;
using HotelReservation.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HotelReservation.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HotelsController : ControllerBase
{
    private readonly HotelService _hotelService;

    public HotelsController(HotelService hotelService)
    {
        _hotelService = hotelService;
    }

    
    [HttpGet]
    public async Task<IActionResult> Search([FromQuery] HotelSearchDto search)
    {
        return Ok(await _hotelService.SearchAsync(search));
    }

   
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var hotel = await _hotelService.GetByIdAsync(id);
        return hotel == null ? NotFound() : Ok(hotel);
    }

    
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateHotel(
        int id,
        UpdateHotelDto dto,
        [FromHeader(Name = "X-User-Role")] string role) // Preluăm rolul din header
    {
        
        if (role != UserRole.Administrator.ToString())
        {
            return Forbid("Acces refuzat: Doar administratorii pot modifica datele hotelului.");
        }

        var ok = await _hotelService.UpdateHotelAsync(id, dto);
        return ok ? NoContent() : NotFound();
    }

    
    [HttpPatch("{id:int}/status")]
    public async Task<IActionResult> ChangeStatus(
        int id,
        [FromBody] StatusHotel status,
        [FromHeader(Name = "X-User-Role")] string role)
    {
        
        if (role != UserRole.Administrator.ToString())
        {
            return Forbid("Acces refuzat: Doar administratorii pot schimba statusul hotelului.");
        }

        var ok = await _hotelService.ChangeStatusAsync(id, status);
        return ok ? NoContent() : NotFound();
    }
}