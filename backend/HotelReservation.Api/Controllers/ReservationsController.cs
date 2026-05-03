using HotelReservation.Api.DTOs;
using HotelReservation.Api.Models;
using HotelReservation.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace HotelReservation.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReservationsController : ControllerBase
{
    private readonly ReservationService _reservationService;

    public ReservationsController(ReservationService reservationService)
    {
        _reservationService = reservationService;
    }

    
    [HttpPost]
    public async Task<IActionResult> CreateReservation(CreateReservationDto dto)
    {
        try
        {
            return Ok(await _reservationService.CreateReservationAsync(dto));
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(ex.Message);
        }
    }

   
    [HttpGet]
    public async Task<IActionResult> GetAll([FromHeader(Name = "X-User-Role")] string role, [FromHeader(Name = "X-User-Id")] int userId)
    {

        var reservations = await _reservationService.GetReservationsByRoleAsync(role, userId);
        return Ok(reservations);
    }

   
    [HttpPatch("{id}/cancel")]
    public async Task<IActionResult> CancelReservation(
        int id,
        [FromHeader(Name = "X-User-Role")] string role,
        [FromHeader(Name = "X-User-Id")] int userId)
    {
        try
        {
            
            var success = await _reservationService.CancelReservationAsync(id, role, userId);
            return success ? Ok("Rezervare anulata.") : NotFound();
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
    }
}