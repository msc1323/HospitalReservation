using HospitalReservation.Data;
using Microsoft.AspNetCore.Mvc;
using HospitalReservation.Models;

namespace HospitalReservation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : Controller
    {
        private readonly ApplicationDbContext _db;

        public PatientController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpPost("new")]
        public async Task<IActionResult> AddPatient(Patient patient)
        {
            try
            {
                patient.SystemField.CreatedAt = DateTime.UtcNow;
                patient.SystemField.UpdatedAt = DateTime.UtcNow;
                patient.SystemField.isActive = true;

                _db.Patients.Add(patient);
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
