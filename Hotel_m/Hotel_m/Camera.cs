namespace Hotel_m
{
    internal class Camera
    {
        public int Etaj { get; set; }
        public int Numar { get; set; }
        public TipCamera.Tip Tip { get; set; }
        public bool Disponibilitate { get; set; }
        public string Facilitati { get; set; }

        public Camera(int etaj, int numar, TipCamera.Tip tip, bool disponibilitate, string facilitati)
        {
            Etaj = etaj;
            Numar = numar;
            Tip = tip;
            Disponibilitate = disponibilitate;
            Facilitati = facilitati;
        }

        public bool EsteDisponibila(DateTime dataStart, DateTime dataFinal)
        {
            
            return Disponibilitate;
        }
    }
}