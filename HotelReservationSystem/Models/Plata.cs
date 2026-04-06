namespace HotelReservationSystem.Models
{
    public class Plata
    {
        public int Id { get; set; }
        public int RezervareId { get; set; }

        public decimal Suma { get; set; }
        public string Metoda { get; set; } // Card, Cash, Voucher
        public DateTime DataPlatii { get; set; } = DateTime.Now;

        public Rezervare Rezervare { get; set; }
    }
}