namespace HotelReservation.Api.DTOs;

public class LoginDto
{
    public string Email { get; set; } = string.Empty;
    public string Parola { get; set; } = string.Empty;
}

public class LoginResponseDto
{
    public int Id { get; set; }
    public string Nume { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Rol { get; set; } = string.Empty;
}
