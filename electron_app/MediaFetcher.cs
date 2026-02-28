using System;
using System.IO;
using System.Threading.Tasks;
using Windows.Media.Control;
using Windows.Storage.Streams;

public class MediaInfoFetcher {
    public static string GetMediaInfo() {
        return Task.Run(async () => {
            try {
                var manager = await GlobalSystemMediaTransportControlsSessionManager.RequestAsync();
                var session = manager.GetCurrentSession();
                if (session == null) return "{}";

                var props = await session.TryGetMediaPropertiesAsync();
                var playbackInfo = session.GetPlaybackInfo();
                bool isPlaying = playbackInfo != null && playbackInfo.PlaybackStatus == GlobalSystemMediaTransportControlsSessionPlaybackStatus.Playing;

                string artist = props.Artist;
                string title = props.Title;
                string base64Cover = "";

                if (props.Thumbnail != null) {
                    using (var stream = await props.Thumbnail.OpenReadAsync()) {
                        using (var reader = new DataReader(stream)) {
                            await reader.LoadAsync((uint)stream.Size);
                            byte[] bytes = new byte[stream.Size];
                            reader.ReadBytes(bytes);
                            base64Cover = Convert.ToBase64String(bytes);
                        }
                    }
                }

                // escape for json
                artist = artist.Replace("\\", "\\\\").Replace("\"", "\\\"");
                title = title.Replace("\\", "\\\\").Replace("\"", "\\\"");

                return "{\"artist\":\"" + artist + "\",\"title\":\"" + title + "\",\"isPlaying\":" + (isPlaying ? "true" : "false") + ",\"cover\":\"" + base64Cover + "\"}";
            } catch {
                return "{}";
            }
        }).GetAwaiter().GetResult();
    }
}
