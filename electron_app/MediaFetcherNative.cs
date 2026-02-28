using System;
using System.IO;
using System.Threading.Tasks;
using Windows.Media.Control;
using Windows.Storage.Streams;

class Program
{
    static void Main()
    {
        Task.Run(() =>
        {
            try
            {
                var manager = GlobalSystemMediaTransportControlsSessionManager.RequestAsync().AsTask().GetAwaiter().GetResult();
                var session = manager.GetCurrentSession();
                if (session == null)
                {
                    Console.WriteLine("{}");
                    return;
                }

                var props = session.TryGetMediaPropertiesAsync().AsTask().GetAwaiter().GetResult();
                var playbackInfo = session.GetPlaybackInfo();
                bool isPlaying = playbackInfo != null && playbackInfo.PlaybackStatus == GlobalSystemMediaTransportControlsSessionPlaybackStatus.Playing;

                string artist = props.Artist ?? "";
                string title = props.Title ?? "";
                string base64Cover = "";

                if (props.Thumbnail != null)
                {
                    using (var stream = props.Thumbnail.OpenReadAsync().AsTask().GetAwaiter().GetResult())
                    {
                        using (var reader = new DataReader(stream))
                        {
                            reader.LoadAsync((uint)stream.Size).AsTask().GetAwaiter().GetResult();
                            byte[] bytes = new byte[stream.Size];
                            reader.ReadBytes(bytes);
                            base64Cover = Convert.ToBase64String(bytes);
                        }
                    }
                }

                artist = artist.Replace("\\", "\\\\").Replace("\"", "\\\"");
                title = title.Replace("\\", "\\\\").Replace("\"", "\\\"");

                Console.WriteLine("{\"artist\":\"" + artist + "\",\"title\":\"" + title + "\",\"isPlaying\":" + (isPlaying ? "true" : "false") + ",\"cover\":\"" + base64Cover + "\"}");
            }
            catch (Exception ex)
            {
                Console.WriteLine("{\"error\":\"" + ex.Message.Replace("\\", "\\\\").Replace("\"", "\\\"") + "\"}");
            }
        }).GetAwaiter().GetResult();
    }
}
