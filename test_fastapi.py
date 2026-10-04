import asyncio
from httpx import AsyncClient, ASGITransport
from backend.main import app

async def main():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        files = {'file': ('test.jpg', b'dummy_image_data', 'image/jpeg')}
        data = {'language': 'en'}
        response = await ac.post("/api/document", files=files, data=data)
        print("Status code:", response.status_code)
        print("Response JSON:", response.json())

asyncio.run(main())
