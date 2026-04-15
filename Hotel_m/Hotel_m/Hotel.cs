using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel_m
{
    internal class Hotel : IGestionareStatus
    {
        public string locatie;
        public string facilitati;
        public Boolean allInclusive;
        public Boolean justBreakfast;
        public int stele;
        public int metri_de_plaja;
        public int metri_de_centrul_orasului;
        public int metri_de_atractii_turistice;
        public StatusHotel status;

        public Hotel(string locatie, string facilitati, Boolean allInclusive, Boolean justBreakfast, int stele, int metri_de_plaja, int metri_de_centrul_orasului, int metri_de_atractii_turistice, StatusHotel status)
        {
            this.locatie = locatie;
            this.facilitati = facilitati;
            this.allInclusive = allInclusive;
            this.justBreakfast = justBreakfast;
            this.stele = stele;
            this.metri_de_plaja = metri_de_plaja;
            this.metri_de_centrul_orasului = metri_de_centrul_orasului;
            this.metri_de_atractii_turistice = metri_de_atractii_turistice;
            this.status = status;
        }

        public void AfisareCamere()
        {

        }
        public Boolean VerificareDisponibilitate()
        {
            return true;
        }
    }
}
