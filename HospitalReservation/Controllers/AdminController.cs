using HospitalReservation.Data;
using HospitalReservation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalReservation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : Controller
    {
        private readonly ApplicationDbContext _db;

        public AdminController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpPost("new_doctor")]
        public async Task<IActionResult> AddNewDoctor(Doctor NewDoctor)
        {
            try
            {
                NewDoctor.SystemField.CreatedAt = DateTime.UtcNow;
                NewDoctor.SystemField.UpdatedAt = DateTime.UtcNow;
                NewDoctor.SystemField.isActive = true;

                _db.Doctors.Add(NewDoctor);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        
    }
}
