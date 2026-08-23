# Potatonator

Potatonator is a Slack bot I made where you can adopt your own potato and level it up.

I started this project because I wanted to make a small game that people could play directly in Slack. The main idea is that you get a potato, give it a name, and then use commands to interact with it and improve its stats.

## What it can do

- Adopt a potato
- View your potato's profile
- Explore and earn XP and coins
- Level up your potato
- Get random potato facts
- Keep track of your potato's stats

The leveling system gives your potato XP when you explore. Once you get enough XP, your potato levels up. Coins are also earned through exploring.


## Commands

- `/adopt` - Adopt a potato
- `/profile` - See your potato's stats
- `/explore` - Go exploring and earn XP and coins
- `/fact` - Get a random potato fact

## How I built it

The Slack bot is made with Node.js and connects to Slack using the Slack API.

I also made a Cloudflare Workers API with a D1 database. The database stores information about users and their potatoes, including their level, XP, coins, and stats.

The bot is hosted on Hack Club Nest, so it can keep running even when my computer is turned off. I set it up as a systemd service so the bot automatically starts and can restart if it stops.

## AI Use Declaration
I used AI as a development aid while creating Potatonator. I used it to help identify and troubleshoot errors in my code, explain technical concepts, and assist with writing and improving some sections of code. I also used AI for guidance with Git/GitHub, deployment and hosting setup, debugging, and writing project documentation such as the README and development log.

I remained responsible for the project, tested the code myself, and made the final decisions about how the features and systems were implemented. AI was used as a tool to support my development process rather than to create the entire project for me.