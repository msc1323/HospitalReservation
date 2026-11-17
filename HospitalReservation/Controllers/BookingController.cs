using HospitalReservation.Data;
using HospitalReservation.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalReservation.Controllers;

[ApiController]
[Route("api/booking")]
public class BookingController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly UserManager<IdentityUser> _users;

    public BookingController(ApplicationDbContext db, UserManager<IdentityUser> users)
    {
        _db = db;
        _users = users;
    }

    [HttpGet("availability")]
    public async Task<IActionResult> Availability([FromQuery] int doctorId, [FromQuery] DateTime date)
    {
        if (date == default)
            return BadRequest(new { message = "Adj meg egy dátumot." });

        var doctor = await _db.Doctors.FirstOrDefaultAsync(d => d.Id == doctorId && d.SystemField.isActive);
        if (doctor == null)
            return NotFound(new { message = "Az orvos nem található." });

        var start = date.Date;
        var end = start.AddDays(1);
        var bookings = await _db.Bookings
            .Where(b => b.DoctorId == doctorId && b.StartTime < end && b.FinishTime > start)
            .Select(b => new { b.StartTime, b.FinishTime })
            .ToListAsync();

        return Ok(new { date = start, bookings });
    }

    [Authorize]
    [HttpGet("mine")]
    public async Task<IActionResult> MyBookings()
    {
        var user = await _users.GetUserAsync(User);
        if (user == null)
            return Unauthorized();

        var patient = await _db.Patients.FirstOrDefaultAsync(p => p.CInformationPatient.Email == user.Email);
        if (patient == null)
            return Ok(Array.Empty<object>());

        var bookings = await _db.Bookings
            .Include(b => b.Doctor)
            .Where(b => b.PatientId == patient.Id)
            .OrderByDescending(b => b.StartTime)
            .Select(b => new
            {
                b.Id,
                b.StartTime,
                b.FinishTime,
                b.Comment,
                b.Status,
                doctorName = b.Doctor.PsInformation.LastName + " " + b.Doctor.PsInformation.FirstName,
                specialization = b.Doctor.ProfInformation.Specialization,
                qualification = b.Doctor.ProfInformation.Qualification
            })
            .ToListAsync();

        return Ok(bookings);
    }

    [Authorize]
    [HttpPost("new")]
    public async Task<IActionResult> NewBooking([FromBody] BookingDto request)
    {
        var user = await _users.GetUserAsync(User);
        if (user == null)
            return Unauthorized();

        var patient = await _db.Patients.FirstOrDefaultAsync(p =>
            p.CInformationPatient.Email == user.Email && p.SystemField.isActive);
        if (patient == null)
            return BadRequest(new { message = "Nem található aktív betegprofil." });

        if (request.StartTime <= DateTime.Now ||
            request.FinishTime <= request.StartTime ||
            request.FinishTime > request.StartTime.AddHours(2))
            return BadRequest(new { message = "Érvénytelen időpont." });

        if (!await _db.Doctors.AnyAsync(d => d.Id == request.DoctorId && d.SystemField.isActive))
            return NotFound(new { message = "Az orvos nem található." });

        if (await _db.Bookings.AnyAsync(b =>
            b.DoctorId == request.DoctorId &&
            b.StartTime < request.FinishTime &&
            b.FinishTime > request.StartTime))
            return Conflict(new { message = "Ez az időpont már foglalt." });

        var booking = new Booking
        {
            PatientId = patient.Id,
            DoctorId = request.DoctorId,
            StartTime = request.StartTime,
            FinishTime = request.FinishTime,
            Comment = request.Comment,
            Status = true
        };

        _db.Bookings.Add(booking);
        await _db.SaveChangesAsync();
        return Ok(new { booking.Id });
    }

    [Authorize]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Cancel(int id)
    {
        var user = await _users.GetUserAsync(User);
        if (user == null)
            return Unauthorized();

        var booking = await _db.Bookings
            .Include(b => b.Patient)
            .FirstOrDefaultAsync(b => b.Id == id);

        if (booking == null || booking.Patient.CInformationPatient.Email != user.Email)
            return NotFound();

        if (booking.StartTime <= DateTime.Now)
            return BadRequest(new { message = "Már megkezdett időpont nem mondható le." });

        _db.Bookings.Remove(booking);
        await _db.SaveChangesAsync();
        return Ok();
    }
}
