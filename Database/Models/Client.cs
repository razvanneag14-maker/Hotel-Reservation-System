namespace ProiectIIDB.Models
{
    public class Client
    {
        public int Id { get; set; }
        public int Varsta { get; set; }
        public string Email { get; set; }
        public string NrTelefon { get; set; }

        public ICollection<Rezervare> Rezervari { get; set; }
        public ICollection<Recenzie> Recenzii { get; set; }
    }
}
