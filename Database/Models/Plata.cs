using ProiectIIDB.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProiectIIDB.Models
{
    public class Plata
    {
        public int Id { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Suma { get; set; }
        public TipPlata Tip { get; set; }

        public int RezervareId { get; set; }
        public Rezervare Rezervare { get; set; }
    }
}
