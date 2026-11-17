using HospitalReservation.Data;
using HospitalReservation.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalReservation.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> _users;
    private readonly SignInManager<IdentityUser> _signIn;
    private readonly ApplicationDbContext _db;

    public AuthController(UserManager<IdentityUser> users, SignInManager<IdentityUser> signIn, ApplicationDbContext db)
    {
        _users = users;
        _signIn = signIn;
        _db = db;
    }

    public record RegisterRequest(string FirstName, string LastName, string Email, string Password, string DateOfBirth, bool Gender, string PhoneNumber, string HomeAddress);
    public record LoginRequest(string Email, string Password);

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.FirstName) ||
            string.IsNullOrWhiteSpace(request.LastName) ||
            string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.Password) ||
            string.IsNullOrWhiteSpace(request.HomeAddress) ||
            string.IsNullOrWhiteSpace(request.PhoneNumber) ||
            !DateOnly.TryParse(request.DateOfBirth, out var birthDate))
        {
            return BadRequest(new { message = "Minden kötelező adatot adj meg." });
        }

        var email = request.Email.Trim().ToLowerInvariant();
        if (await _users.FindByEmailAsync(email) != null)
        {
            return Conflict(new { message = "Ezzel az e-mail címmel már regisztráltak." });
        }

        var user = new IdentityUser
        {
            UserName = email,
            Email = email,
            EmailConfirmed = true
        };

        var result = await _users.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            return BadRequest(new { message = string.Join(" ", result.Errors.Select(e => e.Description)) });
        }

        try
        {
            _db.Patients.Add(new Patient
            {
                PsInformation = new PersonalInformation
                {
                    FirstName = request.FirstName.Trim(),
                    LastName = request.LastName.Trim(),
                    DateOfBirth = birthDate,
                    Gender = request.Gender
                },
                PrbInformation = new ProblemInformation
                {
                    Problem = string.Empty,
                    AdditionalInformation = string.Empty,
                    Urgent = false,
                    HasWorsened = false,
                    Severity = ProblemSeverity.Mild,
                    StartedAt = DateOnly.FromDateTime(DateTime.Today)
                },
                CInformationPatient = new ContactInformationPatient
                {
                    Email = email,
                    PhoneNumber = request.PhoneNumber.Trim(),
                    HomeAddress = request.HomeAddress.Trim()
                },
                SystemField = new SystemFields
                {
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    isActive = true
                }
            });

            await _db.SaveChangesAsync();
        }
        catch
        {
            await _users.DeleteAsync(user);
            return StatusCode(500, new { message = "A regisztráció nem sikerült. Ellenőrizd, hogy a backend és az adatbázis rendben elindult-e." });
        }

        await _signIn.SignInAsync(user, isPersistent: false);
        return Ok(new { email, isAdmin = false });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var user = await _users.FindByEmailAsync(request.Email.Trim().ToLowerInvariant());
        if (user == null)
            return Unauthorized(new { message = "Hibás e-mail cím vagy jelszó." });

        var result = await _signIn.PasswordSignInAsync(user, request.Password, false, lockoutOnFailure: true);
        if (!result.Succeeded)
            return Unauthorized(new { message = "Hibás e-mail cím vagy jelszó." });

        return Ok(new { email = user.Email, isAdmin = await _users.IsInRoleAsync(user, "Admin") });
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        var user = await _users.GetUserAsync(User);
        if (user == null)
            return Unauthorized();

        var patient = await _db.Patients.FirstOrDefaultAsync(p => p.CInformationPatient.Email == user.Email);
        return Ok(new
        {
            email = user.Email,
            isAdmin = await _users.IsInRoleAsync(user, "Admin"),
            patientId = patient?.Id,
            name = patient == null
                ? user.Email
                : patient.PsInformation.LastName + " " + patient.PsInformation.FirstName
        });
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signIn.SignOutAsync();
        return Ok();
    }
}
