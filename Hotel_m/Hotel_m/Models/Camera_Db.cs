using Hotel_m.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel_m.Models
{
    public class Camera_Db
    {
        public int Id { get; set; }
        public int Etaj { get; set; }
        public int Numar { get; set; }
        public TipCamera Tip { get; set; }
        public bool Disponibilitate { get; set; }
        public string Facilitati { get; set; }

        public int HotelId { get; set; }
        public Hotel_Db Hotel { get; set; }

        public ICollection<Rezervare_Db> Rezervari { get; set; }
    }
}
