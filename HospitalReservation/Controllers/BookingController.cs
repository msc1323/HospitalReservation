using HospitalReservation.Data;
using Microsoft.AspNetCore.Mvc;
using HospitalReservation.Models;

namespace HospitalReservation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : Controller
    {
        private readonly ApplicationDbContext _db;

        public BookingController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpPost("new")]
        public async Task<IActionResult> NewBooking([FromBody] BookingDto request)
        {
            var booking = new Booking
            {
                PatientId = request.PatientId,
                DoctorId = request.DoctorId,
                StartTime = request.StartTime,
                FinishTime = request.FinishTime,
                Comment = request.Comment,
                Status = false
            };

            foreach (var item in _db.Bookings)
            {
                if (item.StartTime == booking.StartTime && item.DoctorId == booking.DoctorId)
                {
                    return Conflict(new { success = false, message = "Ez az időpont már foglalt!"});
                }
            }
            _db.Bookings.Add(booking);
            await _db.SaveChangesAsync();
            return Ok();
        }
    }
}
