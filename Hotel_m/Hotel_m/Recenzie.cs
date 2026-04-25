using System;

namespace Hotel_m
{
    public class Recenzie
    {
        public DateTime Data { get; set; }
        public int Rating { get; set; }
        public string Comentariu { get; set; }
        public Client Autor { get; set; }
        public Hotel HotelRecenzat { get; set; }

        public Recenzie() { }
        public Recenzie(Client client, Hotel hotel, int rating, string comentariu)
        {
            Data = DateTime.Now; // Setăm automat data curentă
            Rating = ValidareRating(rating); // Validăm să nu primim 100 de stele
            Comentariu = comentariu;
            Autor = client;
            HotelRecenzat = hotel;
        }
        private int ValidareRating(int r)
        {
            if (r < 1) return 1;
            if (r > 5) return 5;
            return r;
        }

        public void ModificaComentariu(string textNou)
        {
            Comentariu = textNou;
            Data = DateTime.Now; 
            Console.WriteLine("Comentariul a fost actualizat.");
        }

        public void ModificaRating(int ratingNou)
        {
            Rating = ValidareRating(ratingNou);
            Console.WriteLine($"Ratingul a fost schimbat la {Rating} stele.");
        }
    }
}