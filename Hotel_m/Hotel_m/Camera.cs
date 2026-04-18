namespace Hotel_m
{
    internal class Camera
    {
        public int Etaj { get; set; }
        public int Numar { get; set; }
        public TipCamera Tip { get; set; }
        public bool Disponibilitate { get; set; } = true;
        public List<string> Facilitati { get; set; } = new();

        public List<Rezervare> Rezervari { get; set; } = new(); 
        public bool EsteDisponibila(DateTime dataStart, DateTime dataFinal)
        {
            foreach (var rezervare in Rezervari)
            {
                bool seSuprapun = dataStart < rezervare.DataCheckIn && dataFinal > rezervare.DataCheckOut;
                if (seSuprapun)
                {
                    Disponibilitate = false;
                }
            }
            return Disponibilitate;
        }
    }
}