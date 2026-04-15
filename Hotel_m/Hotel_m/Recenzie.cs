using System;

namespace Hotel_m
{
    internal class Recenzie
    {
        public DateTime Data { get; set; }
        public int Rating { get; set; }
        public string Comentariu { get; set; }

        public Recenzie(int rating, string comentariu)
        {
            Data = DateTime.Now;
            Rating = rating;
            Comentariu = comentariu;
        }

        public void ModificaComentariu(string textNou)
        {
            Comentariu = textNou;
        }

        public void ModificaRating(int ratingNou)
        {
            Rating = ratingNou;
        }
    }
}