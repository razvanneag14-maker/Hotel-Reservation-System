namespace HotelReservation.Api.Models;

public class Turist
{
    public int Id { get; set; }
    public string Nume { get; set; } = string.Empty;
    public string Prenume { get; set; } = string.Empty;
    public string CNP { get; set; } = string.Empty;
    public int Varsta { get; set; }

    public int RezervareId { get; set; }
    public Rezervare? Rezervare { get; set; }
}
