using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Threading.Tasks;
using WGAdminAPI.Services;

namespace WGAdminAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        [HttpGet("status")]
        public Task<string> GetWGAdminStatus()
        {
            var output = "sudo systemctl status wg-quick@wg0".Bash();

            return output;
        }

        [HttpGet("reset")]
        public Task<string> ResetAdmin()
        {
            "sudo systemctl restart wg-quick@wg0".Bash();

            var output = "sudo systemctl status wg-quick@wg0".Bash();

            return output;
        }
    }
}
