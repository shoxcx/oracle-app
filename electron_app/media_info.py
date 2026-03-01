import asyncio
import sys
import json
import base64
from winsdk.windows.media.control import GlobalSystemMediaTransportControlsSessionManager, GlobalSystemMediaTransportControlsSessionPlaybackStatus
import winsdk.windows.storage.streams as streams

async def main():
    try:
        manager = await GlobalSystemMediaTransportControlsSessionManager.request_async()
        session = manager.get_current_session()
        if not session:
            print(json.dumps({"error": "No session"}))
            return
            
        props = await session.try_get_media_properties_async()
        playback = session.get_playback_info()
        timeline = session.get_timeline_properties()
        
        is_playing = playback.playback_status == GlobalSystemMediaTransportControlsSessionPlaybackStatus.PLAYING
        
        pos_s = timeline.position.total_seconds() if hasattr(timeline.position, 'total_seconds') else 0
        end_s = timeline.end_time.total_seconds() if hasattr(timeline.end_time, 'total_seconds') else 0

        artist = props.artist
        title = props.title
        
        thumb_b64 = None
        thumb = props.thumbnail
        if thumb:
            try:
                stream = await thumb.open_read_async()
                size = stream.size
                buffer = streams.Buffer(size)
                await stream.read_async(buffer, size, 0)
                reader = streams.DataReader.from_buffer(buffer)
                b = bytearray(size)
                reader.read_bytes(b)
                # Ensure the proper content type logic if needed, but usually image/jpeg or image/png
                # Usually windows thumbnail is jpg
                thumb_b64 = "data:image/jpeg;base64," + base64.b64encode(b).decode('utf-8')
            except Exception as e:
                pass

        print(json.dumps({
            "artist": artist,
            "title": title,
            "isPlaying": is_playing,
            "positionMs": int(pos_s * 1000),
            "durationMs": int(end_s * 1000),
            "cover": thumb_b64
        }))
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    asyncio.run(main())
