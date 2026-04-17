using System;
using System.Numerics;

namespace Hotel_m
{
    internal class Rezervare
    {
        public DateTime DataCheckIn { get; set; }
        public DateTime DataCheckOut { get; set; }
        public string Status { get; set; } // confirmată/anulată
        public double PretTotal { get; set; }
        public Camera CameraRezervata { get; set; }
        public Plata DetaliiPlata { get; set; }

        public Rezervare(DateTime checkIn, DateTime checkOut, Camera camera)
        {
            DataCheckIn = checkIn;
            DataCheckOut = checkOut;
            CameraRezervata = camera;
            Status = "In asteptare";
        }

        public void RezervaCamera()
        {
            Status = "Confirmata";
            CameraRezervata.Disponibilitate = false;
        }

        public void AnuleazaRezervare()
        {
            Status = "Anulata";
            CameraRezervata.Disponibilitate = true;
        }

        public double CalculeazaPret()
        {
            
            TimeSpan durata = DataCheckOut - DataCheckIn;
            PretTotal = durata.Days * 200; 
            return PretTotal;
        }
    }
}