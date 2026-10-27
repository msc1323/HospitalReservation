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
        public async Task<IActionResult> NewBooking(Doctor doctor, Booking booking)
        {
            foreach (var item in _db.Bookings)
            {
                if (item.StartTime == booking.StartTime)
                {
                    return Conflict(new { success = false, message = "Ez az időpont már foglalt!"});
                }
            }
            _db.Bookings.Add(booking);
            return Ok();
        }
    }
}
