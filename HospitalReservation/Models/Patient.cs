using System.ComponentModel.DataAnnotations;

namespace HospitalReservation.Models
{
    public enum ProblemSeverity
    {
        Mild,
        Moderate,
        Severe
    }
    public class ProblemInformation
    {
        [Required]
        public string Problem { get; set; } = string.Empty;

        public bool Urgent { get; set; } = false;

        public DateOnly StartedAt { get; set; } = new DateOnly(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);

        public ProblemSeverity Severity { get; set; } = ProblemSeverity.Mild;
        public bool HasWorsened { get; set; } = false;

        public string? AdditionalInformation { get; set; }
    }

    public class ContactInformationPatient
    {
        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        public string HomeAddress { get; set; } = string.Empty;
    }

    public class Patient
    {
        public int Id { get; set; }
        public PersonalInformation PsInformation { get; set; } = new();
        public ProblemInformation PrbInformation { get; set; } = new();
        public ContactInformationPatient CInformationPatient { get; set; } = new();
        public SystemFields SystemField { get; set; } = new();
        public ICollection<Booking> Bookings { get; set; }
        = new List<Booking>();
    }
}
