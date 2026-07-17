# Myster Manager

A powerful, self-hosted Discord bot built with [discord.js v14](https://discord.js.org/). Packed with moderation tools, an economy system, auto-moderation, and a fully local web dashboard.

---

## Features

- **Moderation** — Ban, kick, warn, timeout, purge, lock channels
- **Auto-Mod** — Anti-spam, anti-link, bad-word filter, anti-caps, raid protection
- **Economy** — Coins, daily rewards, leaderboard, blackjack, slots, coinflip, roulette
- **Welcomer** — Custom welcome/leave messages and auto-role assignment
- **NSFW Filter** — AI-powered image scanning (optional, disabled by default)
- **Logging** — Full audit log for message edits, deletes, joins, and leaves
- **Web Dashboard** — Local control panel to manage all settings from a browser

---

## Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- A Discord bot application from the [Developer Portal](https://discord.com/developers/applications)

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
Copy the example file and fill in your values:
```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `DISCORD_TOKEN` | Your bot token from the Discord Developer Portal |
| `CLIENT_ID` | Your bot's Application ID |
| `GUILD_ID` | Your Discord server ID |
| `DASHBOARD_PORT` | Port for the web dashboard (default: `3000`) |
| `DASHBOARD_PASSWORD` | Password to log into the dashboard |

### 4. Run the bot
```bash
npm start
```

This starts both the bot and the web dashboard simultaneously.

---

## Dashboard

The web dashboard runs locally at `http://localhost:3000` by default.

Log in with the password set in your `.env` file (`DASHBOARD_PASSWORD`).

From the dashboard you can:
- Toggle auto-mod rules
- Configure welcome messages
- View moderation logs and warnings
- Manage economy balances
- Enable/disable the NSFW filter

---

## Commands

### Moderation
| Command | Description |
|---|---|
| `/ban` | Ban a member |
| `/kick` | Kick a member |
| `/warn` | Warn a member |
| `/warnings` | View a member's warnings |
| `/clearwarnings` | Clear a member's warnings |
| `/timeout` | Timeout a member |
| `/purge` | Bulk delete messages |
| `/lock` | Lock a channel |
| `/unlock` | Unlock a channel |
| `/slowmode` | Set channel slowmode |

### Economy
| Command | Description |
|---|---|
| `/balance` | Check your coin balance |
| `/daily` | Claim your daily reward |
| `/give` | Give coins to another user |
| `/leaderboard` | View the richest users |
| `/blackjack` | Play blackjack |
| `/slots` | Spin the slot machine |
| `/coinflip` | Flip a coin |
| `/roulette` | Play roulette |
| `/rob` | Attempt to rob another user |

### Utility
| Command | Description |
|---|---|
| `/help` | Show all commands |
| `/ping` | Check bot latency |
| `/avatar` | Get a user's avatar |
| `/userinfo` | View info about a user |
| `/serverinfo` | View server information |

---

## License

MIT
