using HotelReservation.Api.DTOs;
using HotelReservation.Api.Models;
using HotelReservation.Api.Services;
using Microsoft.AspNetCore.Mvc;

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
    public async Task<IActionResult> UpdateHotel(int id, UpdateHotelDto dto)
    {
        var ok = await _hotelService.UpdateHotelAsync(id, dto);
        return ok ? NoContent() : NotFound();
    }

    [HttpPatch("{id:int}/status")]
    public async Task<IActionResult> ChangeStatus(int id, StatusHotel status)
    {
        var ok = await _hotelService.ChangeStatusAsync(id, status);
        return ok ? NoContent() : NotFound();
    }
}
