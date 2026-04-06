namespace HotelReservationSystem.Models
{
    public class Hotel
    {
        public int Id { get; set; }
        public string Nume { get; set; }
        public string Locatie { get; set; }
        public string Descriere { get; set; }
        public string Facilitati { get; set; }

        // Aceasta este o listă de obiecte de tip Camera
        public List<Camera> Camere { get; set; } = new List<Camera>();
    }
}