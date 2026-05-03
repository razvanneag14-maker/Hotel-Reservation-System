using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using Hotel_m.Enum;

namespace Hotel_m.Models
{
    public class Plata_Db
    {
        public int Id { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Suma { get; set; }
        public TipPlata Tip { get; set; }

        public int RezervareId { get; set; }
        public Rezervare_Db Rezervare { get; set; }
    }
}
