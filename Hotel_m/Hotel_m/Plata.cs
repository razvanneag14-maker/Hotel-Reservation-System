namespace Hotel_m
{
    internal class Plata
    {
        public double Suma { get; set; }
        public TipPlata.Tip Tip { get; set; }

        public Plata(double suma, TipPlata.Tip tip)
        {
            Suma = suma;
            Tip = tip;
        }

        public bool EfectueazaPlata()
        {
            
            Console.WriteLine($"S-a achitat suma de {Suma} prin {Tip}");
            return true;
        }
    }
}