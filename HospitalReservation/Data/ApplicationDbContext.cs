using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using HospitalReservation.Models;
using Microsoft.EntityFrameworkCore;

namespace HospitalReservation.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Doctor> Doctors => Set<Doctor>();
        public DbSet<Patient> Patients => Set<Patient>();
        public DbSet<Booking> Bookings => Set<Booking>();


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Doctor>(doctor =>
            {
                doctor.ComplexProperty(d => d.PsInformation);
                doctor.ComplexProperty(d => d.ProfInformation);
                doctor.ComplexProperty(d => d.CInformationDoctor);
                doctor.ComplexProperty(d => d.SystemField);
            });

            modelBuilder.Entity<Patient>(patient =>
            {
                patient.ComplexProperty(p => p.PsInformation);
                patient.ComplexProperty(p => p.PrbInformation);
                patient.ComplexProperty(p => p.CInformationPatient);
                patient.ComplexProperty(p => p.SystemField);
            });

            modelBuilder.Entity<Booking>().ComplexProperty(b => b.SystemField);
        }
    }
}
