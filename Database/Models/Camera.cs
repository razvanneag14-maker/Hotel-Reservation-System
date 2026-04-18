using ProiectIIDB.Enums;

namespace ProiectIIDB.Models
{
    public class Camera
    {
        public int Id { get; set; }
        public int Etaj { get; set; }
        public int Numar { get; set; }
        public TipCamera Tip { get; set; }
        public bool Disponibilitate { get; set; }
        public string Facilitati { get; set; }

        public int HotelId { get; set; }
        public Hotel Hotel { get; set; }

        public ICollection<Rezervare> Rezervari { get; set; }
    }
}
