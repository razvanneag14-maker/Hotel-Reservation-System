namespace HotelReservation.Api.Models;

public class Camera
{
    public int Id { get; set; }
    public int Numar { get; set; }
    public int Etaj { get; set; }
    public TipCamera TipCamera { get; set; }
    public bool Disponibila { get; set; } = true;
    public decimal PretPeNoapte { get; set; }
    public string Facilitati { get; set; } = string.Empty;
    public string DescriereOferta { get; set; } = string.Empty;

    public int HotelId { get; set; }
    public Hotel? Hotel { get; set; }

    public List<Rezervare> Rezervari { get; set; } = new();

    public bool EsteDisponibila(DateTime checkIn, DateTime checkOut)
    {
        if (!Disponibila)
            return false;

        return !Rezervari.Any(r =>
            r.Status != StatusRezervare.Anulata &&
            checkIn < r.DataCheckOut &&
            checkOut > r.DataCheckIn);
    }
}
