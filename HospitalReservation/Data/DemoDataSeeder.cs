using HospitalReservation.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HospitalReservation.Data;

public static class DemoDataSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var roles = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        var users = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();

        await db.Database.MigrateAsync();

        if (!await roles.RoleExistsAsync("Admin"))
        {
            await roles.CreateAsync(new IdentityRole("Admin"));
        }

        var demoDoctors = new List<Doctor>
        {
            new()
            {
                PsInformation = new PersonalInformation { FirstName = "Sándor", LastName = "Kovács", DateOfBirth = new DateOnly(1964, 5, 12), Gender = false },
                ProfInformation = new ProfessionalInformation { Specialization = "Kardiológia", LicencNumber = "KAR-1001", YearsOfExperience = 34, Department = "Kardiológia", Qualification = "Kardiológus" },
                CInformationDoctor = new ContactInformationDoctor { Email = "sandor.kovacs@medbook.hu", PhoneNumber = "+36 20 111 0001", OfficeAddress = "Győr, Baross út 12.", WorkingHours = "Hétfő–Péntek 08:00–16:00" },
                SystemField = new SystemFields { CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow, isActive = true }
            },
            new()
            {
                PsInformation = new PersonalInformation { FirstName = "Éva", LastName = "Szabó", DateOfBirth = new DateOnly(1967, 9, 2), Gender = true },
                ProfInformation = new ProfessionalInformation { Specialization = "Bőrgyógyászat", LicencNumber = "BOR-1002", YearsOfExperience = 29, Department = "Bőrgyógyászat", Qualification = "Bőrgyógyász" },
                CInformationDoctor = new ContactInformationDoctor { Email = "eva.szabo@medbook.hu", PhoneNumber = "+36 20 111 0002", OfficeAddress = "Budapest, Alkotás utca 24.", WorkingHours = "Hétfő–Csütörtök 09:00–16:00" },
                SystemField = new SystemFields { CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow, isActive = true }
            },
            new()
            {
                PsInformation = new PersonalInformation { FirstName = "Anna", LastName = "Tóth", DateOfBirth = new DateOnly(1993, 3, 25), Gender = true },
                ProfInformation = new ProfessionalInformation { Specialization = "Fogászat", LicencNumber = "FOG-1003", YearsOfExperience = 8, Department = "Fogászat", Qualification = "Fogorvos" },
                CInformationDoctor = new ContactInformationDoctor { Email = "anna.toth@medbook.hu", PhoneNumber = "+36 20 111 0003", OfficeAddress = "Győr, Szent István út 8.", WorkingHours = "Hétfő–Péntek 08:00–15:30" },
                SystemField = new SystemFields { CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow, isActive = true }
            },
            new()
            {
                PsInformation = new PersonalInformation { FirstName = "Petra", LastName = "Kiss", DateOfBirth = new DateOnly(1997, 7, 14), Gender = true },
                ProfInformation = new ProfessionalInformation { Specialization = "Fogászat", LicencNumber = "FOG-1004", YearsOfExperience = 4, Department = "Fogászat", Qualification = "Dentálhigiénikus" },
                CInformationDoctor = new ContactInformationDoctor { Email = "petra.kiss@medbook.hu", PhoneNumber = "+36 20 111 0004", OfficeAddress = "Győr, Szent István út 8.", WorkingHours = "Hétfő–Péntek 08:00–15:30" },
                SystemField = new SystemFields { CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow, isActive = true }
            },
            new()
            {
                PsInformation = new PersonalInformation { FirstName = "Dániel", LastName = "Varga", DateOfBirth = new DateOnly(1992, 11, 4), Gender = false },
                ProfInformation = new ProfessionalInformation { Specialization = "Gyermekgyógyászat", LicencNumber = "GYE-1005", YearsOfExperience = 7, Department = "Gyermekgyógyászat", Qualification = "Gyermekorvos" },
                CInformationDoctor = new ContactInformationDoctor { Email = "daniel.varga@medbook.hu", PhoneNumber = "+36 20 111 0005", OfficeAddress = "Budapest, Lehel utca 15.", WorkingHours = "Hétfő–Szerda 08:00–15:30" },
                SystemField = new SystemFields { CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow, isActive = true }
            },
            new()
            {
                PsInformation = new PersonalInformation { FirstName = "Júlia", LastName = "Nagy", DateOfBirth = new DateOnly(1994, 1, 18), Gender = true },
                ProfInformation = new ProfessionalInformation { Specialization = "Gyermekgyógyászat", LicencNumber = "GYE-1006", YearsOfExperience = 6, Department = "Gyermekgyógyászat", Qualification = "Gyermekorvos" },
                CInformationDoctor = new ContactInformationDoctor { Email = "julia.nagy@medbook.hu", PhoneNumber = "+36 20 111 0006", OfficeAddress = "Győr, Batthyány tér 3.", WorkingHours = "Csütörtök–Péntek 08:00–15:30" },
                SystemField = new SystemFields { CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow, isActive = true }
            }
        };

        var demoEmails = demoDoctors.Select(d => d.CInformationDoctor.Email).ToHashSet(StringComparer.OrdinalIgnoreCase);
        var existingDoctors = await db.Doctors.ToListAsync();

        foreach (var doctor in existingDoctors)
        {
            if (!demoEmails.Contains(doctor.CInformationDoctor.Email))
            {
                doctor.SystemField.isActive = false;
                doctor.SystemField.UpdatedAt = DateTime.UtcNow;
            }
        }

        foreach (var demoDoctor in demoDoctors)
        {
            var existing = existingDoctors.FirstOrDefault(d => d.CInformationDoctor.Email == demoDoctor.CInformationDoctor.Email);
            if (existing == null)
            {
                db.Doctors.Add(demoDoctor);
                continue;
            }

            existing.PsInformation = demoDoctor.PsInformation;
            existing.ProfInformation = demoDoctor.ProfInformation;
            existing.CInformationDoctor = demoDoctor.CInformationDoctor;
            existing.SystemField.isActive = true;
            existing.SystemField.UpdatedAt = DateTime.UtcNow;
        }

        await db.SaveChangesAsync();

        var adminEmail = Environment.GetEnvironmentVariable("HOSPITAL_ADMIN_EMAIL");
        if (!string.IsNullOrWhiteSpace(adminEmail))
        {
            var admin = await users.FindByEmailAsync(adminEmail);
            if (admin != null && !await users.IsInRoleAsync(admin, "Admin"))
            {
                await users.AddToRoleAsync(admin, "Admin");
            }
        }
    }
}
