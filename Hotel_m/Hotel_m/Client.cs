using System.Collections.Generic;

namespace Hotel_m
{
    internal class Client
    {
        public int Varsta { get; set; }
        public string Email { get; set; }
        public string NrTelefon { get; set; }
        public List<Rezervare> Rezervari { get; set; }

        public Client(int varsta, string email, string nrTelefon)
        {
            Varsta = varsta;
            Email = email;
            NrTelefon = nrTelefon;
            Rezervari = new List<Rezervare>();
        }

        public void FaRezervare(Rezervare rezervare)
        {
            Rezervari.Add(rezervare);
        }

        public void AnuleazaRezervare(Rezervare rezervare)
        {
            Rezervari.Remove(rezervare);
        }

        public void LasaRecenzie(Hotel hotel, string comentariu, int rating)
        {
            
        }
    }
}