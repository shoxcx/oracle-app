[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[Windows.Media.Control.GlobalSystemMediaTransportControlsSessionManager, Windows.Media, ContentType = WindowsRuntime] | Out-Null
$manager = [Windows.Media.Control.GlobalSystemMediaTransportControlsSessionManager]::RequestAsync().GetAwaiter().GetResult()
$session = $manager.GetCurrentSession()
if ($session) {
    $props = $session.TryGetMediaPropertiesAsync().GetAwaiter().GetResult()
    $obj = @{ 
        artist = $props.Artist; 
        title = $props.Title; 
        isPlaying = ($session.GetPlaybackInfo().PlaybackStatus.ToString() -eq "Playing") 
    }
    if ($props.Thumbnail) {
        $streamArgs = $props.Thumbnail.OpenReadAsync().GetAwaiter().GetResult()
        $reader = New-Object Windows.Storage.Streams.DataReader $streamArgs
        $reader.LoadAsync($streamArgs.Size).GetAwaiter().GetResult() | Out-Null
        $bytes = New-Object byte[] $streamArgs.Size
        $reader.ReadBytes($bytes)
        $obj.cover = [Convert]::ToBase64String($bytes)
        $reader.Close()
        $streamArgs.Close()
    }
    $obj | ConvertTo-Json
} else {
    Write-Output "{}"
}
