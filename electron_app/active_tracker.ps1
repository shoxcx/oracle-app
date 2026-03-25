param (
    [int]$ParentPid
)

Add-Type @"
  using System;
  using System.Runtime.InteropServices;
  using System.Text;
  public class Win32 {
    [DllImport("user32.dll")]
    public static extern IntPtr GetForegroundWindow();
    [DllImport("user32.dll")]
    public static extern int GetWindowThreadProcessId(IntPtr hWnd, out int lpdwProcessId);
    [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
    public static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);
  }
"@

while ($true) {
    if ($ParentPid -gt 0) {
        $parent = Get-Process -Id $ParentPid -ErrorAction SilentlyContinue
        if (-not $parent) { Exit }
    }

    $hwnd = [Win32]::GetForegroundWindow()
    if ($hwnd -ne [IntPtr]::Zero) {
        $sb = New-Object System.Text.StringBuilder(256)
        [Win32]::GetWindowText($hwnd, $sb, $sb.Capacity) | Out-Null
        $title = $sb.ToString()
        
        $pidVal = 0
        [Win32]::GetWindowThreadProcessId($hwnd, [ref]$pidVal) | Out-Null
        $proc = Get-Process -Id $pidVal -ErrorAction SilentlyContinue
        $procName = if ($proc) { $proc.ProcessName } else { "" }

        Write-Output ($procName + "|" + $title)
    }
    
    Start-Sleep -Milliseconds 1000
}
