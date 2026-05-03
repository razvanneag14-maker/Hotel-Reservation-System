namespace HotelReservation.Api.Models;

public class Plata
{
    public int Id { get; set; }
    public decimal Suma { get; set; }
    public TipPlata TipPlata { get; set; }
    public bool EsteEfectuata { get; set; }

    public int RezervareId { get; set; }
    public Rezervare? Rezervare { get; set; }
}
