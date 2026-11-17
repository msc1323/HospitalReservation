using HospitalReservation.Data;
using HospitalReservation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Diagnostics;

namespace HospitalReservation.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _db;

        public HomeController(ApplicationDbContext db)
        {
            _db = db;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpGet("doctors")]
        public async Task<IActionResult> GetAllDoctors()
        {
            var doctors = await _db.Doctors.Where(d => d.SystemField.isActive)
                .Select(d => new { d.Id, d.PsInformation, d.ProfInformation, d.CInformationDoctor, d.SystemField })
                .ToListAsync();
            return Ok(doctors);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchDoctor(
            [FromQuery] string? spec,
            [FromQuery] string? city,
            [FromQuery] DateTime? date
            )
        {
            var query = _db.Doctors
            .Where(d => d.SystemField.isActive);

            if (!string.IsNullOrWhiteSpace(spec))
            {
                query = query.Where(d => d.ProfInformation.Specialization.ToLower().Contains(spec.ToLower()));
            }

            if (!string.IsNullOrWhiteSpace(city))
            {
                query = query.Where(d => d.CInformationDoctor.OfficeAddress.ToLower().Contains(city.ToLower()));
            }

            if (date.HasValue)
            {
                query = query.Where(d => d.Bookings.Any(b => b.StartTime == date && b.Status == false));
            }

            var result = await query.Select(d => new { d.Id, d.PsInformation, d.ProfInformation, d.CInformationDoctor, d.SystemField }).ToListAsync();
            return Ok(result);
        }
    }
}
