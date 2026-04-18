using System;

namespace Hotel_m
{
    internal class Rezervare
    {
        public DateTime DataCheckIn { get; set; }
        public DateTime DataCheckOut { get; set; }
        public string Status { get; set; } 
        public double PretTotal { get; set; }

        
        public Camera CameraRezervata { get; set; }
        public Plata DetaliiPlata { get; set; }
        public Client Titular { get; set; } 

        public Rezervare(DateTime checkIn, DateTime checkOut, Camera camera, Client client)
        {
            DataCheckIn = checkIn;
            DataCheckOut = checkOut;
            CameraRezervata = camera;
            Titular = client;
            Status = "In asteptare";

            
            CalculeazaPret();
        }

        public void RezervaCamera()
        {
           
            if (CameraRezervata.EsteDisponibila(DataCheckIn, DataCheckOut))
            {
                Status = "Confirmata";
                
                CameraRezervata.Rezervari.Add(this);
                Console.WriteLine($" Rezervare confirmată pentru {Titular.Email} la camera {CameraRezervata.Numar}");
            }
            else
            {
                Status = "Esuata";
                Console.WriteLine(" Camera nu este disponibilă pentru perioada selectată.");
            }
        }

        public void AnuleazaRezervare()
        {
            Status = "Anulata";
            CameraRezervata.Rezervari.Remove(this);
            Console.WriteLine(" Rezervarea a fost anulată.");
        }

        public double CalculeazaPret()
        {
            TimeSpan durata = DataCheckOut - DataCheckIn;
            int nopti = durata.Days;

            if (nopti <= 0) nopti = 1; // Minim o noapte de cazare

            // Folosim un preț de bază sau prețul setat în clasa Cameră
            // Dacă ai adăugat 'Pret' în clasa Camera, poți pune CameraRezervata.Pret
            PretTotal = nopti * 250.0;

            return PretTotal;
        }
    }
}