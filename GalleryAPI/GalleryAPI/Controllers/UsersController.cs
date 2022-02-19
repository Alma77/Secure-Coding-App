using Microsoft.AspNetCore.Mvc;
using GalleryAPI.Database;
using GalleryAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

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
        public async Task<IEnumerable<User>> Get()
        {
            return await _context.Users.ToListAsync();
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public async Task<User> Get(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        [HttpPost("login")]
        public async void Login([FromBody] User user)
        {
            var isValidPassword = true;
            var validUser = await _context.Users.FirstOrDefaultAsync(u => u.Name == user.Name);

            if (validUser == null)
            {
                throw new UnauthorizedAccessException("User Name or Password is incorrect!");
            }
            else
            {
                byte[] hashBytes = Convert.FromBase64String(validUser.Password);
                byte[] salt = new byte[16];
                Array.Copy(hashBytes, 0, salt, 0, 16);
                var pbkdf2 = new Rfc2898DeriveBytes(user.Password, salt, 100000);
                byte[] hash = pbkdf2.GetBytes(20);

                for (int i = 0; i < 20; i++)
                    if (hashBytes[i + 16] != hash[i])
                        isValidPassword = false;

                if (isValidPassword)
                {
                    SessionData sessionData = new SessionData();
                    sessionData.SessionId = Guid.NewGuid().ToString();
                    sessionData.User = validUser;
                    _context.Update(validUser);
                    await _context.AddAsync(sessionData);
                    await _context.SaveChangesAsync();

                    CookieOptions cookieOptions = new CookieOptions();
                    cookieOptions.Expires = new DateTimeOffset(DateTime.Now.AddDays(7));
                    cookieOptions.HttpOnly = true;
                    cookieOptions.SameSite = SameSiteMode.Strict;

                    Response.Cookies.Append(sessionData.SessionId, validUser.Name, cookieOptions);
                }
                else
                {
                    throw new UnauthorizedAccessException("User Name or Password is incorrect!");
                }
            }
        }

        [HttpPost("logout")]
        public async Task Logout()
        {
            SessionData sessionData = new SessionData();
            sessionData.SessionId = Request.Cookies.First().Key;

            sessionData.Id = _context.Sessions.FirstOrDefault(s => s.SessionId == sessionData.SessionId).Id;
            sessionData.User = _context.Sessions.FirstOrDefault(s => s.SessionId == sessionData.SessionId).User;

            if (sessionData == null)
            {
                throw new Exception("No valid session!");
            }
            else
            {
                Response.Cookies.Delete(sessionData.SessionId);

                _context.Sessions.Remove(sessionData);
                await _context.SaveChangesAsync();
            }
        }

        [HttpGet("secure")]
        public async Task<SessionData> GetSession()
        {
            var sessionId = Request.Cookies.First().Key;
            
            var session = await _context.Sessions.FirstOrDefaultAsync(s => s.SessionId == sessionId);

            if(session == null)
            {
                throw new Exception("no session found!");
            }

            return session;
        }

        // POST api/<UsersController>
        [HttpPost]
        public async Task<User> Post([FromBody] User newUser)
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);
            var pbkdf2 = new Rfc2898DeriveBytes(newUser.Password, salt, 100000);
            byte[] hash = pbkdf2.GetBytes(20);
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);
            string savedPasswordHash = Convert.ToBase64String(hashBytes);

            newUser.Password = savedPasswordHash;

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();

            return newUser;
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
