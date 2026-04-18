using ProiectIIDB.Models;
using Microsoft.EntityFrameworkCore;

namespace ProiectIIDB.Data
{
    public class HotelDbContext : DbContext
    {
        public HotelDbContext(DbContextOptions<HotelDbContext> options) : base(options) { }

        public DbSet<Hotel> Hoteluri { get; set; }
        public DbSet<Camera> Camere { get; set; }
        public DbSet<Client> Clienti { get; set; }
        public DbSet<Rezervare> Rezervari { get; set; }
        public DbSet<Plata> Plati { get; set; }
        public DbSet<Recenzie> Recenzii { get; set; }
        public DbSet<AdministratorStatusHotel> Administratori { get; set; }
    }
}
