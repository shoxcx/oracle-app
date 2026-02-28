$code = Get-Content -Raw electron_app\MediaFetcher.cs
Add-Type -TypeDefinition $code -Language CSharp
[MediaInfoFetcher]::GetMediaInfo()
