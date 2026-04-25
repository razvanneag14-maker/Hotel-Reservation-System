using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Hotel_m.Models;

namespace Hotel_m.Data
{
    public class AppDBContext : DbContext
    {
        public DbSet<Hotel_Db> Hoteluri { get; set; }
        public DbSet<Camera_Db> Camere { get; set; }
        public DbSet<Rezervare_Db> Rezervari { get; set; }
        public DbSet<Client_Db> Clienti { get; set; }
        public DbSet<Recenzie_Db> Recenzii { get; set; }
        public DbSet<Plata_Db> Plati { get; set; }
        public DbSet<Administrator_Db> Administratori { get; set; }
        public DbSet<Turist_Db> Turisti { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlite("Data Source=hotel.db");
        }
    }
}
