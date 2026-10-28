using HospitalReservation.Data;
using HospitalReservation.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace HospitalReservation.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class DoctorController : Controller
    {
        private readonly ApplicationDbContext _db;

        public DoctorController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet("bookings")]
        public async Task<IActionResult> Index()
        {
            var booking_list = await _db.Bookings
                .Where(p => p.FinishTime > DateTime.Now && p.Status == true)
                .OrderBy(p => p.StartTime)
                .ThenBy(p => p.Id)
                .ToListAsync();

            return Ok(booking_list);
        }

        [HttpGet("urgents")]
        public async Task<IActionResult> GetUrgents()
        {
            var patient_list = await _db.Patients
                .Where(p => p.PrbInformation.Urgent == true) //Itt szükséges navigation properties
                .ToListAsync();
            return Ok(patient_list);
        }

        [HttpPost("out")] //Nem elérhető időpontok beállítása
        public async Task<IActionResult> OutOfOffice(BookingDtoOOO request)
        {
            var booking = new Booking
            {
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
                    return Conflict(new { success = false, message = "Ez az időpontot már valaki lefoglalta!" });
                }
            }
            _db.Bookings.Add(booking);

            await _db.SaveChangesAsync();
            return Ok();
        }
    }
}
