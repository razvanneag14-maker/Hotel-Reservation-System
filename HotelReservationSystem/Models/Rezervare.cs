namespace HotelReservationSystem.Models
{
    public class Rezervare
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public int CameraId { get; set; }

        public DateTime DataCheckIn { get; set; }
        public DateTime DataCheckOut { get; set; }
        public string Status { get; set; } // Confirmată, Anulată, În așteptare
        public decimal PretTotal { get; set; }

        // Proprietăți de navigare (pentru a accesa ușor datele despre client/cameră)
        public Client Client { get; set; }
        public Camera Camera { get; set; }
    }
}