using Microsoft.AspNetCore.Mvc;
using GalleryAPI.Database;
using GalleryAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

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

        [HttpPost("/login")]
        public void Login([FromBody] User user)
        {
            CookieOptions cookieOptions = new CookieOptions();
            cookieOptions.Expires = new DateTimeOffset(DateTime.Now.AddDays(7));
            cookieOptions.HttpOnly = true;
            HttpContext.Response.Cookies.Append(user.Name, "Hi there!", cookieOptions);
        }

        // POST api/<UsersController>
        [HttpPost]
        public async Task<User> Post([FromBody] User newUser)
        {
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
