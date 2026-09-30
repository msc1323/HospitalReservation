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

        public ProblemSeverity Severity = ProblemSeverity.Mild;
        public bool HasWorsened { get; set; } = false;

        public string? AdditionalInformation { get; set; } = string.Empty;
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

    public class Patient : PersonalInformation
    {
        public PersonalInformation PsInformation { get; set; }
        public ProblemInformation PrbInformation { get; set; }
        public ContactInformationPatient CInformationPatient { get; set; }
        public SystemFields SystemField { get; set; }
        public ICollection<Booking> Bookings { get; set; }
        = new List<Booking>();
    }
}
