namespace HotelReservation.Api.Models;

public class Recenzie
{
    public int Id { get; set; }
    public DateTime Data { get; set; } = DateTime.Now;
    public int Rating { get; set; }
    public string Comentariu { get; set; } = string.Empty;

    public int ClientId { get; set; }
    public Client? Client { get; set; }

    public int HotelId { get; set; }
    public Hotel? Hotel { get; set; }
}
