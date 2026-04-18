namespace Hotel_m
{
    internal class Plata
    {
        public double Suma { get; set; }
        public TipPlata Tip { get; set; }

        public Plata(double suma, TipPlata tip)
        {
            Suma = suma;
            Tip = tip;
        }

        public bool EfectueazaPlata()
        {
            if (Suma <= 0)
            {
                Console.WriteLine("Eroare: Suma de plată trebuie să fie mai mare decât 0.");
                return false;
            }

            
            Console.WriteLine($"Se procesează plata în valoare de {Suma} RON...");

            switch (Tip)
            {
                case TipPlata.CARD_CREDIT:
                case TipPlata.CARD_DEBIT:
                case TipPlata.PLATA_ONLINE:
                    Console.WriteLine($"[Sistem Bancar] Se verifică datele cardului/contului pentru suma de {Suma}...");
                    break;

                case TipPlata.CASH:
                    Console.WriteLine("[Casierie] Plata a fost primită numerar la recepție.");
                    break;

                case TipPlata.VOUCHER:
                    Console.WriteLine($"[Sistem] Se validează codul voucherului pentru suma de {Suma}...");
                    break;

                default:
                    Console.WriteLine($"Plata prin {Tip} a fost înregistrată în sistem.");
                    break;
            }

            
            Console.WriteLine($"✅ Plată reușită! Metoda folosită: {Tip}.");
            return true;
        }
    }
}