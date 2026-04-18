using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;

namespace ProiectIIDB.Models
{
    public class Rezervare
    {
        public int Id { get; set; }
        public DateTime DataCheckIn { get; set; }
        public DateTime DataCheckOut { get; set; }
        public string Status { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal PretTotal { get; set; }

        public int ClientId { get; set; }
        public Client Client { get; set; }

        public int CameraId { get; set; }
        public Camera Camera { get; set; }

        public Plata Plata { get; set; }
    }
}
