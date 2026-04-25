using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel_m.Models
{
    public class Recenzie_Db
    {
        public int Id { get; set; }
        public DateTime Data { get; set; }
        public int Rating { get; set; }
        public string Comentariu { get; set; }

        public int ClientId { get; set; }
        public Client_Db Client { get; set; }

        public int HotelId { get; set; }
        public Hotel_Db Hotel { get; set; }
    }
}
