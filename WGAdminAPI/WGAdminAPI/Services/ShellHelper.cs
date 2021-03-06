using System.Diagnostics;
using System.Threading.Tasks;


namespace WGAdminAPI.Services
{
    public static class ShellHelper
    {
        public static Task<string> Bash(this string cmd)
        {
            var escapedArgs = cmd.Replace("\"", "\\\"");

            var process = new Process()
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName="/bin/bash",
                    Arguments = $"-c \"{escapedArgs}\"",
                    CreateNoWindow = true,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
		    WorkingDirectory = "/var/repos/Secure-Coding-Project/WGAdminAPI/WGAdminAPI",
                }
            };

            process.Start();
            string output = process.StandardOutput.ReadToEnd();
            process.WaitForExit();

            return Task.FromResult(output);
        }
    }
}
