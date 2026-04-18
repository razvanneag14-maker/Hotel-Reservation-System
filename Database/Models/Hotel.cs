using ProiectIIDB.Enums;

namespace ProiectIIDB.Models
{
    public class Hotel
    {
        public int Id { get; set; }
        public string Locatie { get; set; }
        public string Facilitati { get; set; }
        public string Descriere { get; set; }
        public StatusHotel Status { get; set; }

        public ICollection<Camera> Camere { get; set; }
        public ICollection<Recenzie> Recenzii { get; set; }
    }
}
