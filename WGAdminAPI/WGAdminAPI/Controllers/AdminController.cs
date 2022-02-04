using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Threading.Tasks;

namespace WGAdminAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        [HttpGet("status")]
        public string GetWGAdminStatus()
        {
            var process = new Process()
            {
                StartInfo = new ProcessStartInfo()
                {
                    FileName = "sysStatus.sh",
                    Arguments = string.Empty,
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    CreateNoWindow = true,
                    //WorkingDirectory = "C:\\repos\\WGAdminAPI\\WGAdminAPI\\"
                }
            };

            process.Start();

            string output = process.StandardOutput.ReadToEnd();
            process.WaitForExit();

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
