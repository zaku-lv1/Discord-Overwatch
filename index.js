require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Discord client with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Bot state management
const botStates = new Map(); // Track which channels have the bot active

// Bot configuration
const BOT_PREFIX = process.env.BOT_PREFIX || '!';
const SUMMON_COMMAND = process.env.SUMMON_COMMAND || 'summon';
const DISMISS_COMMAND = process.env.DISMISS_COMMAND || 'dismiss';

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, readyClient => {
    console.log(`✅ Ready! Logged in as ${readyClient.user.tag}`);
});

// Listen for message events
client.on(Events.MessageCreate, async message => {
    // Ignore messages from bots
    if (message.author.bot) return;

    const channelId = message.channel.id;
    const content = message.content.trim();

    // Handle summon command
    if (content === `${BOT_PREFIX}${SUMMON_COMMAND}`) {
        botStates.set(channelId, true);
        await message.reply('🤖 **Overwatch AI Bot has been summoned!** 🎮\n\nYou can now ask me anything about Overwatch! Just type your questions directly.\nTo dismiss me, use `!dismiss`');
        return;
    }

    // Handle dismiss command
    if (content === `${BOT_PREFIX}${DISMISS_COMMAND}`) {
        botStates.delete(channelId);
        await message.reply('👋 **Overwatch AI Bot is now dismissed!** Use `!summon` to call me back anytime.');
        return;
    }

    // Only respond to questions if bot is active in this channel
    if (!botStates.get(channelId)) return;

    // Ignore command messages when bot is active
    if (content.startsWith(BOT_PREFIX)) return;

    // Generate response using Gemini AI for Overwatch-related questions
    try {
        await message.channel.sendTyping();
        
        const prompt = `You are an expert on Overwatch (the video game by Blizzard Entertainment). 
        Answer the following question about Overwatch in a helpful and informative way. 
        If the question is not related to Overwatch, politely redirect the conversation back to Overwatch topics.
        Keep your response concise but informative.
        
        Question: ${content}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Split long messages to avoid Discord's character limit
        if (text.length > 2000) {
            const chunks = text.match(/.{1,1900}/g);
            for (const chunk of chunks) {
                await message.reply(chunk);
            }
        } else {
            await message.reply(text);
        }
    } catch (error) {
        console.error('Error generating AI response:', error);
        await message.reply('❌ Sorry, I encountered an error while processing your question. Please try again later.');
    }
});

// Error handling
client.on(Events.Error, error => {
    console.error('Discord client error:', error);
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN);