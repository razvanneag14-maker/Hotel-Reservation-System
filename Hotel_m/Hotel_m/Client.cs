using System;
using System.Collections.Generic;

namespace Hotel_m
{
    internal class Client
    {
        public string Nume { get; set; } 
        public int Varsta { get; set; }
        public string Email { get; set; }
        public string NrTelefon { get; set; }
        public List<Rezervare> Rezervari { get; set; }

        public Client(string nume, int varsta, string email, string nrTelefon)
        {
            Nume = nume;
            Varsta = varsta;
            Email = email;
            NrTelefon = nrTelefon;
            Rezervari = new List<Rezervare>();
        }

        public void FaRezervare(Rezervare rezervare)
        {
            
            if (rezervare != null)
            {
                Rezervari.Add(rezervare);
                Console.WriteLine($"Rezervarea pentru {Nume} a fost înregistrată.");
            }
        }

        public void AnuleazaRezervare(Rezervare rezervare)
        {
            if (Rezervari.Contains(rezervare))
            {
                Rezervari.Remove(rezervare);
                Console.WriteLine("Rezervarea a fost anulată cu succes.");
            }
        }

       
        public void LasaRecenzie(Hotel hotel, string comentariu, int rating)
        {
            
            Recenzie nouaRecenzie = new Recenzie(this, hotel, rating, comentariu);

            
            hotel.Recenzii.Add(nouaRecenzie);

            Console.WriteLine($"Clientul {Nume} a lăsat o recenzie de {rating} stele pentru hotelul {hotel.Locatie}.");
        }

        public void StergeRecenzie(Hotel hotel, Recenzie recenzie)
        {
            if (hotel.Recenzii.Contains(recenzie))
            {
                hotel.Recenzii.Remove(recenzie);
                Console.WriteLine("Recenzia a fost ștearsă.");
            }
        }
    }
}