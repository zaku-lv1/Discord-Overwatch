# Discord-Overwatch

A Discord Chat Bot that answers questions about Overwatch using Google's Gemini AI. Users can summon and dismiss the AI bot to freely ask questions about the game.

## Features

- 🤖 **AI-Powered**: Uses Google Gemini AI to provide intelligent answers about Overwatch
- 🎮 **Overwatch Expert**: Specialized in answering questions about Overwatch gameplay, heroes, maps, strategies, and more
- 💬 **Easy Commands**: Simple summon and dismiss commands to control bot interaction
- 🔧 **Configurable**: Environment-based configuration for easy deployment
- 📱 **Discord Integration**: Native Discord bot with proper message handling

## Commands

- `!summon` - Summon the Overwatch AI bot to start answering questions
- `!dismiss` - Dismiss the AI bot to stop responding to messages
- Ask any Overwatch-related question when the bot is active

## Setup

### Prerequisites

- Node.js (v16 or higher)
- Discord Bot Token
- Google Gemini API Key

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/zaku-lv1/Discord-Overwatch.git
   cd Discord-Overwatch
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment configuration:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` file with your credentials:
   ```env
   DISCORD_TOKEN=your_discord_bot_token_here
   DISCORD_CLIENT_ID=your_discord_client_id_here
   GEMINI_API_KEY=your_gemini_api_key_here
   BOT_PREFIX=!
   SUMMON_COMMAND=summon
   DISMISS_COMMAND=dismiss
   ```

### Getting Required Tokens

#### Discord Bot Token

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to "Bot" section
4. Create a bot and copy the token
5. Enable necessary bot permissions:
   - Send Messages
   - Read Message History
   - Use Slash Commands

#### Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key

### Running the Bot

Start the bot:
```bash
npm start
```

For development:
```bash
npm run dev
```

### Adding Bot to Discord Server

1. Go to Discord Developer Portal > Your Application > OAuth2 > URL Generator
2. Select scopes: `bot`
3. Select permissions: `Send Messages`, `Read Message History`
4. Use the generated URL to invite the bot to your server

## Usage Example

```
User: !summon
Bot: 🤖 Overwatch AI Bot has been summoned! 🎮

You can now ask me anything about Overwatch! Just type your questions directly.
To dismiss me, use !dismiss

User: What are the best DPS heroes for beginners?
Bot: For beginners in Overwatch, I recommend these DPS heroes:

1. **Soldier: 76** - Easy aim mechanics, self-healing ability
2. **Pharah** - Rocket launcher with splash damage, good mobility
3. **Junkrat** - Area denial with grenades, forgiving aim requirements
...

User: !dismiss
Bot: 👋 Overwatch AI Bot is now dismissed! Use !summon to call me back anytime.
```

## Configuration

You can customize the bot behavior by modifying the `.env` file:

- `BOT_PREFIX`: Command prefix (default: `!`)
- `SUMMON_COMMAND`: Command to activate bot (default: `summon`)
- `DISMISS_COMMAND`: Command to deactivate bot (default: `dismiss`)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.