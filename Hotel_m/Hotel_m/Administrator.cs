using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel_m
{
    internal class Administrator
    {
        private int id_Administrator;
        private string name;
        private string email;
        private int telefon;
        public List<Hotel> hoteluri;

        public Administrator(int id_Administrator, string name, string email, int telefon)
        {
            this.id_Administrator = id_Administrator;
            this.name = name;
            this.email = email;
            this.telefon = telefon;
            this.hoteluri = new List<Hotel>();
        }

        private void AdaugaHotel(Hotel hotel)
        {
            hoteluri.Add(hotel);
        }
        private void SchimbaStatusHotel(Hotel hotel, StatusHotel status)
        {
            hotel.status = status;
        }
        private void BlocheazaRezervari()
        {
            
        }
        private void DeblocheazaRezervari()
        {

        }
        private void NotificaSite()
        {

        }
    }
}
