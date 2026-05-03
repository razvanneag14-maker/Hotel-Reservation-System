namespace HotelReservation.Api.Models;

public class Administrator
{
    public int Id { get; set; }
    public string Nume { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Parola { get; set; } = string.Empty;
    public string Telefon { get; set; } = string.Empty;

    public List<Hotel> Hoteluri { get; set; } = new();
}
