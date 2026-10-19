using HospitalReservation.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace HospitalReservation.Controllers
{
    public class DoctorController : Controller
    {
        private readonly ApplicationDbContext _db;

        public DoctorController(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<IActionResult> Index()
        {
            var booking_list = await _db.Bookings
                .Where(p => p.FinishTime > DateTime.Now && p.Status == true)
                .OrderBy(p => p.StartTime)
                .ThenBy(p => p.Id)
                .ToListAsync();

            return View(booking_list);
        }

        public async Task<IActionResult> GetUrgents()
        {
            var patient_list = await _db.Patients
                .Where(p => p.PrbInformation.Urgent == true) //Itt szükséges navigation properties
                .ToListAsync();
            return View(patient_list);
        }
    }
}
