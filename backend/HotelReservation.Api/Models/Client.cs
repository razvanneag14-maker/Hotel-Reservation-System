namespace HotelReservation.Api.Models;

public class Client
{
    public int Id { get; set; }
    public string Nume { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Parola { get; set; } = string.Empty;
    public string NrTelefon { get; set; } = string.Empty;

    public List<Rezervare> Rezervari { get; set; } = new();
    public List<Recenzie> Recenzii { get; set; } = new();
}
