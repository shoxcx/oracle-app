import asyncio
import sys
import json

from winsdk.windows.media.control import GlobalSystemMediaTransportControlsSessionManager, GlobalSystemMediaTransportControlsSessionPlaybackStatus

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
        
        # In winsdk, TimeSpan is just datetime.timedelta
        # so total_seconds() works.
        pos_s = timeline.position.total_seconds() if hasattr(timeline.position, 'total_seconds') else 0
        end_s = timeline.end_time.total_seconds() if hasattr(timeline.end_time, 'total_seconds') else 0

        artist = props.artist
        title = props.title

        print(json.dumps({
            "artist": artist,
            "title": title,
            "isPlaying": is_playing,
            "positionMs": int(pos_s * 1000),
            "durationMs": int(end_s * 1000)
        }))
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    asyncio.run(main())
