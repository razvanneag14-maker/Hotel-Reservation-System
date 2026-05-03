using HotelReservation.Api.Models;

namespace HotelReservation.Api.Data;

public static class DbSeeder
{
    public static void Seed(AppDbContext db)
    {
        if (db.Hoteluri.Any())
            return;

        var hotel1 = new Hotel
        {
            Nume = "Hotel Savoy",
            Destinatie = "Mamaia",
            Locatie = "Mamaia, Litoralul Romanesc, Romania",
            Descriere = "Hotel cu piscina, aproape de plaja si oferte early booking.",
            Facilitati = "Internet wireless, piscina, parcare, aproape de plaja",
            TipMasa = "All Inclusive",
            TipUnitate = "Hotel",
            CategorieOferta = "Early Booking",
            ImagineUrl = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
            Scor = 9.1m,
            NumarComentarii = 214,
            Stele = 4,
            MetriDePlaja = 50,
            Camere = new List<Camera>
            {
                new Camera { Numar = 101, Etaj = 1, TipCamera = TipCamera.Double, Disponibila = true, PretPeNoapte = 1437, DescriereOferta = "Dubla standard - Vara 2026 ALL INCLUSIVE ULTRA BOOST" },
                new Camera { Numar = 202, Etaj = 2, TipCamera = TipCamera.Suite, Disponibila = true, PretPeNoapte = 1699, DescriereOferta = "Suite cu vedere la mare, balcon si minibar" }
            }
        };

        var hotel2 = new Hotel
        {
            Nume = "Mamaia Resort",
            Destinatie = "Mamaia",
            Locatie = "Mamaia, Romania",
            Descriere = "Resort modern cu plaja privata, spa si piscina.",
            Facilitati = "Pool, Private Beach, Spa",
            TipMasa = "Mic Dejun",
            TipUnitate = "Resort",
            CategorieOferta = "Oferta Speciala",
            ImagineUrl = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80",
            Scor = 8.8m,
            NumarComentarii = 98,
            Stele = 5,
            MetriDePlaja = 80,
            Camere = new List<Camera>
            {
                new Camera { Numar = 305, Etaj = 3, TipCamera = TipCamera.Single, Disponibila = true, PretPeNoapte = 900, DescriereOferta = "Camera single cu mic dejun inclus" },
                new Camera { Numar = 306, Etaj = 3, TipCamera = TipCamera.Double, Disponibila = false, PretPeNoapte = 1200, DescriereOferta = "Camera dubla, indisponibila temporar" }
            }
        };

        var hotel3 = new Hotel
        {
            Nume = "Hotel Carpati - Poiana Brasov",
            Destinatie = "Poiana Brasov",
            Locatie = "Poiana Brasov, Romania",
            Descriere = "Hotel montan cu sauna, semineu si depozit pentru schiuri.",
            Facilitati = "Ski Storage, Sauna, Fireplace",
            TipMasa = "Demipensiune",
            TipUnitate = "Hotel",
            CategorieOferta = "Sejur munte",
            ImagineUrl = "https://images.unsplash.com/photo-1517320964276-a002fa203177?auto=format&fit=crop&w=900&q=80",
            Scor = 8.5m,
            NumarComentarii = 76,
            Stele = 4,
            MetriDePlaja = 0,
            Camere = new List<Camera>
            {
                new Camera { Numar = 401, Etaj = 4, TipCamera = TipCamera.Double, Disponibila = true, PretPeNoapte = 750, DescriereOferta = "Camera dubla cu vedere la munte" }
            }
        };

        db.Hoteluri.AddRange(hotel1, hotel2, hotel3);

        db.Clienti.Add(new Client { Nume = "Client Demo", Email = "client@test.com", Parola = "1234", NrTelefon = "0712345678" });
        db.Administratori.Add(new Administrator { Nume = "Admin Demo", Email = "admin@test.com", Parola = "1234", Telefon = "0700000000", Hoteluri = new List<Hotel> { hotel1, hotel2, hotel3 } });

        db.SaveChanges();
    }
}
