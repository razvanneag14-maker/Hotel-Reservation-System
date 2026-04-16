using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel_m
{
    internal class Hotel : IGestionareStatus
    {
        public string locatie { get; set; }
        public string facilitati { get; set; }
        public Boolean allInclusive { get; set; } = true;
        public Boolean justBreakfast { get; set; }
        public int stele { get; set; }
        public int metri_de_plaja { get; set; }
        public int metri_de_centrul_orasului { get; set; }
        public int metri_de_atractii_turistice { get; set; }
        private StatusHotel status = StatusHotel.DESCHIS;
        public List<Camera> camere { get; set; } = new();


        public void AfisareCamere()
        {
            foreach (Camera camera in camere)
            {
                Console.WriteLine($"Camera: {camera.Numar}      Tipul: {camera.Tip}      Etaj: {camera.Etaj}      Disponibilitate: {camera.Disponibilitate}");
            }
        }
        public StatusHotel GetStatus()
        {
            return status;
        }

        public Boolean VerificareDisponibilitate(DateTime dataStart, DateTime dataFinal)
        {
            foreach(Camera camera in camere)
            {
                if (camera.EsteDisponibila(dataStart, dataFinal))
                {
                    return true;
                }
            }
            return false;
        }
        public void ActualizareStatus(StatusHotel statusNou)
        {
            status = statusNou;
        }
        public void AcceptaRezervari()
        {
            if (status == StatusHotel.DESCHIS)
            {
                Console.WriteLine("Hotelul este deschis. Se pot accepta rezervari.");
            }
            else
            {
                Console.WriteLine("Hotelul este inchis. Nu se pot accepta rezervari.");
            }
        }
        public Boolean Allin()
        {
            if (allInclusive)
            {
                return allInclusive;
            }
            else
            {
                allInclusive = false;
                return allInclusive;
            }
        }
        public Boolean JustBreakfast()
        {
            if (justBreakfast)
            {
                return justBreakfast;
            }
            else
            {
                justBreakfast = false;
                return justBreakfast;
            }
        }
    }
}
