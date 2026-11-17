using HospitalReservation.Data;
using HospitalReservation.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalReservation.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DoctorController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public DoctorController(ApplicationDbContext db)
    {
        _db = db;
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("bookings")]
    public async Task<IActionResult> Index()
    {
        var bookingList = await _db.Bookings
            .Where(p => p.FinishTime > DateTime.Now && p.Status)
            .OrderBy(p => p.StartTime)
            .ThenBy(p => p.Id)
            .ToListAsync();

        return Ok(bookingList);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("urgents")]
    public async Task<IActionResult> GetUrgents()
    {
        var patientList = await _db.Patients
            .Where(p => p.PrbInformation.Urgent)
            .ToListAsync();
        return Ok(patientList);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("out")]
    public async Task<IActionResult> OutOfOffice(BookingDtoOOO request)
    {
        var exists = await _db.Bookings.AnyAsync(item =>
            item.DoctorId == request.DoctorId &&
            item.StartTime < request.FinishTime &&
            item.FinishTime > request.StartTime);

        if (exists)
        {
            return Conflict(new { message = "Ez az időpont már foglalt vagy blokkolt." });
        }

        var booking = new Booking
        {
            DoctorId = request.DoctorId,
            StartTime = request.StartTime,
            FinishTime = request.FinishTime,
            Comment = request.Comment,
            Status = false
        };

        _db.Bookings.Add(booking);
        await _db.SaveChangesAsync();
        return Ok();
    }
}
