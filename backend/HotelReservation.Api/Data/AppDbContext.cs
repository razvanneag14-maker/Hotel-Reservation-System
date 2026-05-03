using HotelReservation.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace HotelReservation.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Hotel> Hoteluri => Set<Hotel>();
    public DbSet<Camera> Camere => Set<Camera>();
    public DbSet<Client> Clienti => Set<Client>();
    public DbSet<Administrator> Administratori => Set<Administrator>();
    public DbSet<Turist> Turisti => Set<Turist>();
    public DbSet<Rezervare> Rezervari => Set<Rezervare>();
    public DbSet<Plata> Plati => Set<Plata>();
    public DbSet<Recenzie> Recenzii => Set<Recenzie>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Hotel>().HasMany(h => h.Camere).WithOne(c => c.Hotel).HasForeignKey(c => c.HotelId).OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<Hotel>().HasMany(h => h.Recenzii).WithOne(r => r.Hotel).HasForeignKey(r => r.HotelId).OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<Client>().HasMany(c => c.Rezervari).WithOne(r => r.Client).HasForeignKey(r => r.ClientId).OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<Client>().HasMany(c => c.Recenzii).WithOne(r => r.Client).HasForeignKey(r => r.ClientId).OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<Camera>().HasMany(c => c.Rezervari).WithOne(r => r.Camera).HasForeignKey(r => r.CameraId).OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<Rezervare>().HasMany(r => r.Turisti).WithOne(t => t.Rezervare).HasForeignKey(t => t.RezervareId).OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<Rezervare>().HasOne(r => r.Plata).WithOne(p => p.Rezervare).HasForeignKey<Plata>(p => p.RezervareId).OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<Administrator>().HasMany(a => a.Hoteluri).WithMany();
    }
}
