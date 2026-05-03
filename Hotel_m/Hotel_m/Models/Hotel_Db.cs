using Hotel_m.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel_m.Models
{
    public class Hotel_Db
    {
        public int Id { get; set; }
        public string Locatie { get; set; }
        public string Facilitati { get; set; }
        public string Descriere { get; set; }
        public StatusHotel Status { get; set; }

        public ICollection<Camera_Db> Camere { get; set; }
        public ICollection<Recenzie_Db> Recenzii { get; set; }
    }
}
