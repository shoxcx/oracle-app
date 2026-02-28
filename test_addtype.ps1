$code = @"
using System;
using System.Threading.Tasks;
using Windows.Media.Control;

public class MediaTest {
    public static string Check() {
        var managerOp = GlobalSystemMediaTransportControlsSessionManager.RequestAsync();
        managerOp.AsTask().Wait();
        var manager = managerOp.GetResults();
        var session = manager.GetCurrentSession();
        if (session == null) return "null session";
        var timeline = session.GetTimelineProperties();
        return timeline.Position.TotalSeconds.ToString() + " / " + timeline.EndTime.TotalSeconds.ToString();
    }
}
"@
# References
$refs = @(
    "System.Runtime.WindowsRuntime",
    "System.Threading.Tasks",
    "C:\Windows\System32\WinMetadata\Windows.Foundation.winmd",
    "C:\Windows\System32\WinMetadata\Windows.Media.winmd"
)
Add-Type -TypeDefinition $code -ReferencedAssemblies $refs
[MediaTest]::Check()
