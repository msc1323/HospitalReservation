using System.ComponentModel.DataAnnotations;

namespace HospitalReservation.Models
{
    public class PersonalInformation {

        [Required, MaxLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        public DateOnly DateOfBirth { get; set; }

        //Férfi 0 értéknél, Nő 1 értéknél
        [Required]
        public bool Gender { get; set; }
    }

    public class ProfessionalInformation
    {
        [MaxLength(100)]
        public string Specialization { get; set; } = string.Empty;

        [MaxLength(50)]
        public string LicencNumber { get; set; } = string.Empty;

        public int YearsOfExperience { get; set; }

        [MaxLength(100)]
        public string Department { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Qualification { get; set; } = string.Empty;
    }

    public class ContactInformationDoctor
    {
        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        public string OfficeAddress { get; set; } = string.Empty;

        [Required]
        public string WorkingHours { get; set; } = string.Empty;
    }

    public class SystemFields
    {
        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public bool isActive { get; set; } = true;
    }

    public class Doctor
    {
        public int Id { get; set; }
        public PersonalInformation PsInformation { get; set; } = new();
        public ProfessionalInformation ProfInformation { get; set; } = new();
        public ContactInformationDoctor CInformationDoctor { get; set; } = new();
        public SystemFields SystemField { get; set; } = new();
        public ICollection<Booking> Bookings { get; set; }
        = new List<Booking>();
    }
}
