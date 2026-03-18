using System;
using System.Diagnostics;
using System.Linq;

class Fake7za {
    static int Main(string[] args) {
        Process p = new Process();
        p.StartInfo.FileName = "7za_real.exe";
        p.StartInfo.Arguments = string.Join(" ", args.Select(a => "\"" + a + "\""));
        p.StartInfo.UseShellExecute = false;
        p.StartInfo.CreateNoWindow = true;
        p.Start();
        p.WaitForExit();
        return 0; // Ignore error codes so electron-builder doesn't fail on symlinks
    }
}
