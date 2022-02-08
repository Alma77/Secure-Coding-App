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
        public string ResetAdmin()
        {
            var process = new Process();

            process.StartInfo.FileName = "../sysReset.sh";
            process.StartInfo.Arguments= string.Empty;
            process.StartInfo.RedirectStandardError = true;
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.CreateNoWindow = true;

            process.Start();
            process.WaitForExit();

            string output = GetWGAdminStatus();

            return output;
        }
    }
}
