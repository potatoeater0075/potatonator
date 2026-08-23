# 🥔 Potatonator

Potatonator is a Slack bot where you adopt and level up your own potato!

## Features

- 🥔 Adopt your own potato
- 🌾 Explore and discover random events
- ⭐ Earn XP and level up
- 🪙 Earn coins
- 📊 View your potato's profile
- 📚 Get random potato facts
- ☁️ Hosted 24/7 on Hack Club Nest

## Commands

| Command | Description |
|---|---|
| `/adopt` | Adopt your potato |
| `/profile` | View your potato's stats |
| `/explore` | Explore for XP and coins |
| `/fact` | Get a random potato fact |

## Tech Stack

- Node.js
- JavaScript
- Slack API
- Cloudflare Workers
- Cloudflare D1
- Hack Club Nest
- systemd

## Hosting

The Slack bot runs 24/7 on Hack Club Nest using a systemd service.

The API is deployed separately using Cloudflare Workers.

## AI Use Declaration

I used AI as a development aid while creating Potatonator. I used it to help identify and troubleshoot errors in my code, explain technical concepts, and assist with writing and improving some sections of code. I also used AI for guidance with Git/GitHub, deployment and hosting setup, debugging, and writing project documentation such as the README and development log.

I remained responsible for the project, tested the code myself, and made the final decisions about how the features and systems were implemented. AI was used as a tool to support my development process rather than to create the entire project for me.

## Project Structure

```text
potatonator/
├── index.js
├── package.json
├── .gitignore
└── potatonator-api/
    ├── src/
    ├── schema.sql
    ├── package.json
    └── wrangler.jsonc