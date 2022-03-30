﻿using Microsoft.AspNetCore.Mvc;
using GalleryAPI.Database;
using GalleryAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GalleryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly GalleryDbContext _context;

        public UsersController(GalleryDbContext context)
        {
            _context = context;
        }

        // GET: api/<UsersController>
        [HttpGet]
        public async Task<IEnumerable<UserDTO>> Get()
        {
            return await _context.Users.ToListAsync();
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public async Task<UserDTO> Get(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserDTO user)
        {
            var knownUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == user.Username);

            if (knownUser == null)
            {
                _context.Users.AddAsync(user);
                _context.SaveChangesAsync();

            }

            SessionData sessionData = new SessionData();
            sessionData.SessionId = Guid.NewGuid().ToString();
            sessionData.User = user;

            await _context.Sessions.AddAsync(sessionData);
            await _context.SaveChangesAsync();

            CookieOptions cookieOptions = new CookieOptions();
            cookieOptions.Expires = new DateTimeOffset(DateTime.Now.AddDays(1));
            cookieOptions.HttpOnly = true;
            cookieOptions.SameSite = SameSiteMode.Strict;

            Response.Cookies.Append("session", sessionData.SessionId, cookieOptions);


            /*Console.Write("Hit Login endpoint");
            var isValidPassword = true;
            var validUser = await _context.Users.FirstOrDefaultAsync(u => u.Name == user.Name);

            if (validUser == null)
            {
                Console.Write("User Name is incorrect");
                return NotFound(user);
            }
            else
            {
                var salt = Convert.FromBase64String(validUser.Salt);

                string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: user.Password,
                    salt: salt,
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: 100000,
                    numBytesRequested: 256 / 8));

                if (hashed != validUser.Password)
                {
                    Console.Write("password is incorrect");
                    isValidPassword = false;
                }

                if (isValidPassword)
                {
                    SessionData sessionData = new SessionData();
                    sessionData.SessionId = Guid.NewGuid().ToString();
                    sessionData.User = validUser;

                    await _context.Sessions.AddAsync(sessionData);
                    await _context.SaveChangesAsync();

                    CookieOptions cookieOptions = new CookieOptions();
                    cookieOptions.Expires = new DateTimeOffset(DateTime.Now.AddDays(1));
                    cookieOptions.HttpOnly = true;
                    cookieOptions.SameSite = SameSiteMode.Strict;

                    Response.Cookies.Append("session" ,sessionData.SessionId, cookieOptions);
                }
                else
                {
                    return NotFound(user);
                }
            }*/

            return Ok();
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var sessionId = Request.Cookies["session"] ?? string.Empty;

            if (sessionId == string.Empty)
            {
                return NotFound();
            }

            var sessionData = await _context.Sessions.FirstOrDefaultAsync(s => s.SessionId == sessionId);

            if (sessionData == null)
            {
                return NotFound();
            }
            else
            {
                CookieOptions cookieOptions = new CookieOptions();
                cookieOptions.Expires = new DateTimeOffset(DateTime.Now.AddMinutes(-1));

                Response.Cookies.Append("session", "", cookieOptions);

                _context.Sessions.Remove(sessionData);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        [HttpGet("secure")]
        public async Task<SessionData> GetSession()
        {
            var sessionId = Request.Cookies["session"];
            
            var sessionData = await _context.Sessions.Include(s => s.User).FirstOrDefaultAsync(s => s.SessionId == sessionId);
            
            return sessionData;
        }

        // POST api/<UsersController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserDTO newUser)
        {
            byte[] salt = new byte[128 / 8];
            using (var rngCsp = new RNGCryptoServiceProvider())
            {
                rngCsp.GetNonZeroBytes(salt);
            }

            try
            {
                User validUser = new User(new Username(newUser.Username), newUser.Password, Convert.ToBase64String(salt));

                UserDTO newValidUser = new();
                newValidUser.Username = validUser.Name.GetValue();
                newValidUser.Password = validUser.Password;
                newValidUser.Salt = validUser.Salt;

                await _context.Users.AddAsync(newValidUser);
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            /*string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: newUser.Password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));

            newUser.Password = hashed;
            newUser.Salt = Convert.ToBase64String(salt);*/
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
