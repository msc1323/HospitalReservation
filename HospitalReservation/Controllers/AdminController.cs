using HospitalReservation.Data;
using HospitalReservation.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalReservation.Controllers;

[Authorize(Roles = "Admin")]
[Route("api/[controller]")]
[ApiController]
public class AdminController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public AdminController(ApplicationDbContext db)
    {
        _db = db;
    }

    [HttpGet("patients")]
    public async Task<IActionResult> Patients() =>
        Ok(await _db.Patients
            .Select(p => new
            {
                p.Id,
                name = p.PsInformation.FirstName + " " + p.PsInformation.LastName,
                p.CInformationPatient.Email,
                active = p.SystemField.isActive
            })
            .ToListAsync());

    [HttpGet("doctors")]
    public async Task<IActionResult> Doctors() =>
        Ok(await _db.Doctors
            .Select(d => new
            {
                d.Id,
                name = d.PsInformation.LastName + " " + d.PsInformation.FirstName,
                specialty = d.ProfInformation.Specialization,
                qualification = d.ProfInformation.Qualification,
                active = d.SystemField.isActive
            })
            .ToListAsync());

    [HttpPost("new_doctor")]
    public async Task<IActionResult> AddNewDoctor(Doctor newDoctor)
    {
        try
        {
            newDoctor.SystemField.CreatedAt = DateTime.UtcNow;
            newDoctor.SystemField.UpdatedAt = DateTime.UtcNow;
            newDoctor.SystemField.isActive = true;

            _db.Doctors.Add(newDoctor);
            await _db.SaveChangesAsync();
            return Ok();
        }
        catch
        {
            return StatusCode(500, new { message = "Az orvos mentése nem sikerült." });
        }
    }

    [HttpDelete("inactive_doctor")]
    public async Task<IActionResult> InactiveDoctor(int id)
    {
        var doctor = await _db.Doctors.FindAsync(id);
        if (doctor == null)
        {
            return NotFound(new { message = $"Nem található orvos ezzel az ID-val: {id}" });
        }

        doctor.SystemField.isActive = false;
        doctor.SystemField.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok();
    }

    [HttpDelete("inactive_patient")]
    public async Task<IActionResult> InactivePatient(int id)
    {
        var patient = await _db.Patients.FindAsync(id);
        if (patient == null)
        {
            return NotFound(new { message = $"Nem található beteg ezzel az ID-val: {id}" });
        }

        patient.SystemField.isActive = false;
        patient.SystemField.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok();
    }
}
