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

        [HttpDelete("inactive_doctor")]
        public async Task<IActionResult> InactiveDoctor(int id)
        {
            var doctor = await _db.Doctors.FindAsync(id);

            if (doctor == null)
            {
                return NotFound(new { success = false, message = $"Nem található orvos ezzel az ID-val: {id}" });
            }

            doctor.SystemField.isActive = false;
            doctor.SystemField.UpdatedAt = DateTime.UtcNow;

            _db.Doctors.Update(doctor);
            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("inactive_patient")]
        public async Task<IActionResult> InactivePatient(int id)
        {
            var patient = await _db.Patients.FindAsync(id);

            if (patient == null)
            {
                return NotFound(new { success = false, message = $"Nem található beteg ezzel az ID-val: {id}" });
            }

            patient.SystemField.isActive = false;
            patient.SystemField.UpdatedAt = DateTime.UtcNow;

            _db.Patients.Update(patient);
            await _db.SaveChangesAsync();
            return Ok();
        }
    }
}
