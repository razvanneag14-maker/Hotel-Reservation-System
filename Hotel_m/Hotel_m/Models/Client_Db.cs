using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel_m.Models
{
    public class Client_Db
    {
        public int Id { get; set; }
        public int Varsta { get; set; }
        public string Email { get; set; }
        public string NrTelefon { get; set; }

        public ICollection<Rezervare_Db> Rezervari { get; set; }
        public ICollection<Recenzie_Db> Recenzii { get; set; }
    }
}
