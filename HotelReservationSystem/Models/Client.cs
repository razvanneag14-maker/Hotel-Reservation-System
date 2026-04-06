namespace HotelReservationSystem.Models
{
    public class Client
    {
        public int Id { get; set; }
        public string Nume { get; set; }
        public string Email { get; set; }
        public string NrTelefon { get; set; }
        public int Varsta { get; set; }

        // Un client poate avea mai multe rezervări
        public List<Rezervare> Rezervari { get; set; } = new List<Rezervare>();
    }
}