import asyncio
import json
import base64
from winsdk.windows.media.control import GlobalSystemMediaTransportControlsSessionManager
import winsdk.windows.storage.streams as streams

async def main():
    manager = await GlobalSystemMediaTransportControlsSessionManager.request_async()
    session = manager.get_current_session()
    if not session:
        print("no session")
        return
    props = await session.try_get_media_properties_async()
    
    thumb = props.thumbnail
    if thumb:
        stream = await thumb.open_read_async()
        size = stream.size
        buffer = streams.Buffer(size)
        await stream.read_async(buffer, size, 0)
        reader = streams.DataReader.from_buffer(buffer)
        b = bytearray(size)
        reader.read_bytes(b)
        print("data:image/jpeg;base64," + base64.b64encode(b).decode('utf-8')[:30])
    else:
        print("no thumb")

asyncio.run(main())
