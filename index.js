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

    if (interaction.commandName === 'overwatch') {
        const isActive = botStates.get(channelId);
        
        if (isActive) {
            // Bot is active, so dismiss it
            botStates.delete(channelId);
            
            const embed = new EmbedBuilder()
                .setColor(0xFF9900)
                .setTitle('👋 Overwatch AIボットが退出しました！')
                .setDescription('`/overwatch` コマンドでいつでも再召喚できます。')
                .setTimestamp();

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            // Bot is not active, so summon it
            botStates.set(channelId, true);
            
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('🤖 Overwatch AIボットが召喚されました！')
                .setDescription('🎮 Overwatchについて何でも質問してください！\n\nこのチャンネルで直接質問を入力してください。\n終了する場合は `/overwatch` コマンドを再度使用してください。')
                .setTimestamp();

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
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
        
        const prompt = `あなたはOverwatch（Blizzard Entertainmentのビデオゲーム）の専門家です。
        以下のOverwatchに関する質問に、役立つ情報を含む回答をしてください。
        質問がOverwatchに関連していない場合は、丁寧にOverwatchの話題に誘導してください。
        回答は簡潔でありながら情報が豊富になるようにしてください。
        日本語で回答してください。
        
        質問: ${content}`;

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
        await message.reply('❌ 申し訳ございませんが、質問の処理中にエラーが発生しました。後でもう一度お試しください。');
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