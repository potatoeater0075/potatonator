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