namespace HotelReservationSystem.Models
{
    public class Camera
    {
        public int Id { get; set; }
        public int HotelId { get; set; } // Legătura cu Hotelul
        public int Numar { get; set; }
        public int Etaj { get; set; }
        public string Tip { get; set; } // Single, Double, Apartament
        public string Facilitati { get; set; }
        public bool EsteDisponibila { get; set; }
        public decimal PretPeNoapte { get; set; }

        // Navigation property - ajută EF Core să știe căruia hotel îi aparține camera
        public Hotel Hotel { get; set; }
    }
}