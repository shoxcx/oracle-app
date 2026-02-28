[Windows.Media.Control.GlobalSystemMediaTransportControlsSessionManager, Windows.Media, ContentType=WindowsRuntime] | Out-Null
$req = [Windows.Media.Control.GlobalSystemMediaTransportControlsSessionManager]::RequestAsync()
while ($req.Status -eq 0) { Start-Sleep -Milliseconds 10 }
$manager = $req.GetResults()
$session = $manager.GetCurrentSession()
if ($session) {
    $timeline = $session.GetTimelineProperties()
    $pos = $timeline.Position.TotalSeconds
    $end = $timeline.EndTime.TotalSeconds
    Write-Output "pos=$pos end=$end"
} else {
    Write-Output "No session"
}
