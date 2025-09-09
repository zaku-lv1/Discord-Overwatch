require('dotenv').config();
const { Client, GatewayIntentBits, Events, EmbedBuilder } = require('discord.js');
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

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, readyClient => {
    console.log(`✅ Ready! Logged in as ${readyClient.user.tag}`);
});

// Listen for slash command interactions
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const channelId = interaction.channel.id;

    if (interaction.commandName === 'summon') {
        botStates.set(channelId, true);
        
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('🤖 Overwatch AI Bot Summoned!')
            .setDescription('🎮 You can now ask me anything about Overwatch!\n\nJust type your questions directly in this channel.\nUse `/dismiss` to dismiss me when you\'re done.')
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true });
        return;
    }

    if (interaction.commandName === 'dismiss') {
        botStates.delete(channelId);
        
        const embed = new EmbedBuilder()
            .setColor(0xFF9900)
            .setTitle('👋 Overwatch AI Bot Dismissed!')
            .setDescription('Use `/summon` to call me back anytime.')
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true });
        return;
    }
});

// Listen for message events (for AI responses)
client.on(Events.MessageCreate, async message => {
    // Ignore messages from bots
    if (message.author.bot) return;

    const channelId = message.channel.id;
    const content = message.content.trim();

    // Only respond to questions if bot is active in this channel
    if (!botStates.get(channelId)) return;

    // Ignore messages that look like commands (starting with / or !)
    if (content.startsWith('/') || content.startsWith('!')) return;

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