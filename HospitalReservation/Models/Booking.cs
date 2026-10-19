namespace HospitalReservation.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public Patient Patient { get; set; } = null!;
        public int DoctorId { get; set; }
        public Doctor Doctor { get; set; } = null!;
        public DateTime StartTime { get; set; }
        public DateTime FinishTime { get; set; }
        public bool Status { get; set; } = false; //Foglalva van-e. Alapérték hamis szóval szabad
        public string? Comment { get; set; }
        public SystemFields SystemField { get; set; } = new();
    }
}
