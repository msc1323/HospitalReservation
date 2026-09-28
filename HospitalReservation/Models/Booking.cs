namespace HospitalReservation.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public DateTime startTime { get; set; }
        public DateTime finishTime { get; set; }
        public bool status { get; set; } = false; //Foglalva van-e. Alapérték hamis szóval szabad
        public string? comment { get; set; }
        public SystemFields SystemField { get; set; }
    }
}
