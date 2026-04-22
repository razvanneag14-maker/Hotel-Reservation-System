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
        public Camera(int etaj, int numar, TipCamera tip)
        {
            Etaj = etaj;
            Numar = numar;
            Tip = tip;

            
            Disponibilitate = true;
            Facilitati = new List<string>();
            Rezervari = new List<Rezervare>();
        }
        public bool EsteDisponibila(DateTime dataStart, DateTime dataFinal)
        {
            foreach (var rezervare in Rezervari)
            {
                
                
                if (dataStart < rezervare.DataCheckOut && dataFinal > rezervare.DataCheckIn)
                {
                    return false; 
                }
            }

            return true; 
    }
    }
}