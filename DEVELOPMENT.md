# Development Setup Guide

## Quick Start for Developers

1. **Clone and Install**:
   ```bash
   git clone https://github.com/zaku-lv1/Discord-Overwatch.git
   cd Discord-Overwatch
   npm install
   ```

2. **Setup Configuration**:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Check Configuration**:
   ```bash
   npm run config-check
   ```

4. **Start Development**:
   ```bash
   npm run dev
   ```

## Code Structure

```
Discord-Overwatch/
├── index.js           # Main bot application
├── config-check.js    # Configuration validation script
├── package.json       # Project dependencies and scripts
├── .env.example       # Environment variables template
├── .gitignore         # Git ignore rules
└── README.md          # Main documentation
```

## Key Components

### Main Bot (index.js)
- Discord client initialization
- Gemini AI integration
- Message handling and command processing
- State management for active channels

### Configuration Management
- Environment-based configuration
- Validation script for setup verification
- Default values for optional settings

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DISCORD_TOKEN` | Yes | Discord bot token |
| `GEMINI_API_KEY` | Yes | Google Gemini API key |
| `DISCORD_CLIENT_ID` | No | Discord application client ID |
| `BOT_PREFIX` | No | Command prefix (default: `!`) |
| `SUMMON_COMMAND` | No | Summon command (default: `summon`) |
| `DISMISS_COMMAND` | No | Dismiss command (default: `dismiss`) |

## Bot Flow

1. User sends `!summon` command
2. Bot activates for that channel
3. User asks Overwatch questions
4. Bot responds using Gemini AI
5. User sends `!dismiss` to deactivate bot

## Error Handling

- Graceful error handling for API failures
- Message length splitting for long responses
- Proper Discord rate limit handling
- Comprehensive logging for debugging