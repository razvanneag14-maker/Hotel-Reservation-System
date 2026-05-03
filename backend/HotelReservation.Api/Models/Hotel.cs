namespace HotelReservation.Api.Models;

public class Hotel
{
    public int Id { get; set; }
    public string Nume { get; set; } = string.Empty;
    public string Destinatie { get; set; } = string.Empty;
    public string Locatie { get; set; } = string.Empty;
    public string Descriere { get; set; } = string.Empty;
    public string Facilitati { get; set; } = string.Empty;
    public string TipMasa { get; set; } = string.Empty;
    public string TipUnitate { get; set; } = string.Empty;
    public string CategorieOferta { get; set; } = string.Empty;
    public string ImagineUrl { get; set; } = string.Empty;
    public decimal Scor { get; set; }
    public int NumarComentarii { get; set; }
    public int Stele { get; set; }
    public int MetriDePlaja { get; set; }
    public StatusHotel Status { get; set; } = StatusHotel.Deschis;

    public List<Camera> Camere { get; set; } = new();
    public List<Recenzie> Recenzii { get; set; } = new();

    public bool AcceptaRezervari() => Status == StatusHotel.Deschis;
}
