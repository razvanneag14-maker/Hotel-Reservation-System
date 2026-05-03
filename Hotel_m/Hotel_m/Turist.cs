using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel_m
{
    public class Turist
    {
        public int Id { get; set; }

        public int RezervareId { get; set; }
        public Rezervare Rezervari { get; set; }

        public string Nume { get; set; }
        public string Prenume { get; set; }
        public string CNP { get; set; }
        public int Varsta { get; set; }
    }
}
