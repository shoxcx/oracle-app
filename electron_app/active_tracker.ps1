param (
    [int]$ParentPid
)

Add-Type @"
  using System;
  using System.Runtime.InteropServices;
  public class Win32 {
    [DllImport("user32.dll")]
    public static extern IntPtr GetForegroundWindow();
    [DllImport("user32.dll")]
    public static extern int GetWindowThreadProcessId(IntPtr hWnd, out int lpdwProcessId);
  }
"@

while ($true) {
    if ($ParentPid -gt 0) {
        $parent = Get-Process -Id $ParentPid -ErrorAction SilentlyContinue
        if (-not $parent) { Exit }
    }

    $hwnd = [Win32]::GetForegroundWindow()
    if ($hwnd -ne [IntPtr]::Zero) {
        $pidVal = 0
        [Win32]::GetWindowThreadProcessId($hwnd, [ref]$pidVal) | Out-Null
        $proc = Get-Process -Id $pidVal -ErrorAction SilentlyContinue
        if ($proc) {
            Write-Output ($proc.ProcessName + "|" + $proc.MainWindowTitle)
        }
    }
    
    Start-Sleep -Milliseconds 1000
}
