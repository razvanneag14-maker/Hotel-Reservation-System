using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Hotel_m.Models
{
    public class Rezervare_Db
    {
        public int Id { get; set; }
        public DateTime DataCheckIn { get; set; }
        public DateTime DataCheckOut { get; set; }
        public string Status { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal PretTotal { get; set; }

        public int ClientId { get; set; }
        public Client_Db Client { get; set; }

        public int CameraId { get; set; }
        public Camera_Db Camera { get; set; }

        public Plata_Db Plata { get; set; }
    }
}
