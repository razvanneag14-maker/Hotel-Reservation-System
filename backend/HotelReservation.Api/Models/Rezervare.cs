namespace HotelReservation.Api.Models;

public class Rezervare
{
    public int Id { get; set; }
    public DateTime DataCheckIn { get; set; }
    public DateTime DataCheckOut { get; set; }
    public int Nopti { get; set; }
    public int Adulti { get; set; }
    public int Copii { get; set; }
    public StatusRezervare Status { get; set; } = StatusRezervare.InAsteptare;
    public decimal PretTotal { get; set; }

    public int ClientId { get; set; }
    public Client? Client { get; set; }

    public int CameraId { get; set; }
    public Camera? Camera { get; set; }

    public Plata? Plata { get; set; }
    public List<Turist> Turisti { get; set; } = new();
}
