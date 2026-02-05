import discord
from discord.ext import commands

TOKEN = "MTQ2ODk1NjM2OTg4NDQxODE2MA.GHcMfK.aq_SPzETy3R-N6aKx1eHGhHeKQXdI_uDajHo0o"

intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(command_prefix='!', intents=intents)

@bot.event
async def on_ready():
    print(f'บอทออนไลน์แล้ว: {bot.user}')

@bot.command()
async def hello(ctx):
    await ctx.send(f'สวัสดี {ctx.author.name} :wave:')


bot.run(TOKEN)
