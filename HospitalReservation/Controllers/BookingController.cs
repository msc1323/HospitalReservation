using HospitalReservation.Data;
using Microsoft.AspNetCore.Mvc;
using HospitalReservation.Models;
using Microsoft.EntityFrameworkCore;

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

        [HttpGet("availability")]
        public async Task<IActionResult> Availability([FromQuery] int doctorId, [FromQuery] DateTime date)
        {
            if (date == default) return BadRequest(new { message = "Adj meg egy dátumot." }); //default érték akkor jön ha nem választ semmit a user
            var doctor = await _db.Doctors.FirstOrDefaultAsync(d => d.Id == doctorId && d.SystemField.isActive);
            if (doctor is null) return NotFound(new { message = "Az orvos nem található." });
            var day = date.Date;
            var nextDay = day.AddDays(1);
            var bookings = await _db.Bookings
                .Where(b => b.DoctorId == doctorId && b.StartTime < nextDay && b.FinishTime > day).ToListAsync();
            return Ok(new
            {
                Doctor = doctor,
                Date = day,
                Bookings = bookings
            });
        }
    }
}
