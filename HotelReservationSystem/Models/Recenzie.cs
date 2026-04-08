namespace HotelReservationSystem.Models
{
    public class Recenzie
    {
        public int Id { get; set; }
        public int HotelId { get; set; }
        public int ClientId { get; set; }

        public DateTime Data { get; set; } = DateTime.Now;
        public int Rating { get; set; } // 1-5
        public string Comentariu { get; set; }

        public Hotel Hotel { get; set; }
        public Client Client { get; set; }
    }
}