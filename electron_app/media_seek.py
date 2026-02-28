import asyncio
import sys
import json
import datetime

from winsdk.windows.media.control import GlobalSystemMediaTransportControlsSessionManager

async def set_position():
    try:
        target_ms = int(sys.argv[1])
        manager = await GlobalSystemMediaTransportControlsSessionManager.request_async()
        session = manager.get_current_session()
        target_span = datetime.timedelta(milliseconds=target_ms)
        success = await session.try_change_playback_position_async(int(target_span.total_seconds() * 10000000))
        print("Success:", success)
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    asyncio.run(set_position())
