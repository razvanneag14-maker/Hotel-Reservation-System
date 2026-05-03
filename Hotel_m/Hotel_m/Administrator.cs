using Hotel_m.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel_m
{
    public class Administrator
    {
        public int Id_Administrator { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int Telefon { get; set; }

        public List<Hotel> Hoteluri { get; set; } = new();

        // Adauga hotel nou
        public void AdaugaHotel(Hotel hotel)
        {
            if (hotel == null)
            {
                throw new ArgumentNullException("Hotelul nu poate fi null.");
            }

            Hoteluri.Add(hotel);
            Console.WriteLine("Hotel adaugat cu succes.");
        }

        // Schimba status hotel
        public void SchimbaStatusHotel(Hotel hotel, StatusHotel status)
        {
            if (!Hoteluri.Contains(hotel))
            {
                Console.WriteLine("Hotelul nu este administrat.");
                return;
            }

            hotel.ActualizareStatus(status);

            Console.WriteLine($"Status hotel schimbat in: {status}");
        }

        // Blocheaza rezervarile pentru un hotel
        public void BlocheazaRezervari(Hotel hotel)
        {
            if (!Hoteluri.Contains(hotel))
            {
                Console.WriteLine("Hotelul nu este administrat.");
                return;
            }

            hotel.ActualizareStatus(StatusHotel.INDISPONIBIL_PENTRU_REZERVARI);

            Console.WriteLine("Rezervarile au fost blocate.");
        }

        // Deblocheaza rezervarile
        public void DeblocheazaRezervari(Hotel hotel)
        {
            if (!Hoteluri.Contains(hotel))
            {
                Console.WriteLine("Hotelul nu este administrat.");
                return;
            }

            hotel.ActualizareStatus(StatusHotel.DESCHIS);

            Console.WriteLine("Rezervarile au fost deblocate.");
        }

        // Vezi toate rezervarile dintr-un hotel
        public void VeziRezervariHotel(Hotel hotel)
        {
            if (!Hoteluri.Contains(hotel))
            {
                Console.WriteLine("Hotelul nu este administrat.");
                return;
            }

            Console.WriteLine($"Rezervari pentru hotel:");

            foreach (var camera in hotel.camere)
            {
                foreach (var rezervare in camera.Rezervari)
                {
                    Console.WriteLine(
                        $"Camera: {camera.Numar} | " +
                        $"Check-in: {rezervare.DataCheckIn} | " +
                        $"Check-out: {rezervare.DataCheckOut} | " +
                        $"Status: {rezervare.Status}"
                    );
                }
            }
        }

        // Notifica sistemul / site-ul
        public void NotificaSite(string mesaj)
        {
            Console.WriteLine($"Notificare: {mesaj}");
        }
    }
}