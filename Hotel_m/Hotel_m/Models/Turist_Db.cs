using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel_m.Models
{
    public class Turist_Db
    {
        public int Id { get; set; }
        public int RezervareId { get; set; }
        public Rezervare_Db Rezervari { get; set; }
        public string Nume { get; set; }
        public string Prenume { get; set; }
        public string CNP { get; set; }
        public int Varsta { get; set; }
    }
}
