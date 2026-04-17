using System;
using System.Collections.Generic;
using System.Text;

namespace Hotel_m
{
    public interface IGestionareStatus
    {
        void ActualizareStatus(StatusHotel statusNou);
        void AcceptaRezervari();
        StatusHotel GetStatus();   
    }
}
