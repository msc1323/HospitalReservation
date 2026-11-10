namespace HospitalReservation.Models
{
    public class BookingDto
    {
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime FinishTime { get; set; }
        public string? Comment { get; set; }
    }

    public class BookingDtoOOO
    {
        public int DoctorId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime FinishTime { get; set; }
        public string? Comment { get; set; }
    }
}
