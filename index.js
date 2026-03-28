import discord
from discord.ext import tasks
import psutil
import os
import datetime
import pytz

# ดึง Token จาก Secrets ที่เราตั้งไว้
TOKEN = os.getenv('TOKEN')
APP_ID = 1487130863304179934 

class MyClient(discord.Client):
    async def on_ready(self):
        print(f'✅ บอท Python ออนไลน์แล้ว: {self.user}')
        self.update_status.start()

    @tasks.loop(seconds=30)
    async def update_status(self):
        # ตั้งเวลาไทย
        tz = pytz.timezone('Asia/Bangkok')
        now = datetime.datetime.now(tz)
        time_str = now.strftime("%H:%M")
        date_str = now.strftime("%d/%-m/%Y")
        
        # ดึงค่าระบบ
        cpu = psutil.cpu_percent()
        ram = psutil.virtual_memory().percent

        # ตั้งค่าให้เป็นสีม่วง (Streaming)
        activity = discord.Streaming(
            name="Twitch",
            url="https://www.twitch.tv", # ต้องใช้ลิงก์ Twitch/YT จริง
            details="HEART PAIHAISUTH",
            state="I5GEN12+1050Ti",
            application_id=APP_ID
        )

        # ใส่รูปภาพและข้อความสถานะ
        activity.assets['large_image'] = 'https://cdn.discordapp.com/attachments/1276206630043648103/1487145047941054484/bbfa30a752409dc211bda11676d4a2d8.gif'
        activity.assets['large_text'] = f"🕙 {time_str} 🗓️ {date_str} 📊 CPU: {cpu}% RAM: {ram}%"

        await self.change_presence(activity=activity, status=discord.Status.idle)

client = MyClient()
client.run(TOKEN)
