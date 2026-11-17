using HospitalReservation.Data;
using HospitalReservation.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HospitalReservation.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PatientController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public PatientController(ApplicationDbContext db)
    {
        _db = db;
    }

    [Authorize(Roles = "Admin")]
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
        catch
        {
            return StatusCode(500, new { message = "A beteg mentése nem sikerült." });
        }
    }
}
