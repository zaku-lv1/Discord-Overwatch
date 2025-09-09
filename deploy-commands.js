require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
    new SlashCommandBuilder()
        .setName('summon')
        .setDescription('Summon the Overwatch AI Bot to this channel'),
    new SlashCommandBuilder()
        .setName('dismiss')
        .setDescription('Dismiss the Overwatch AI Bot from this channel'),
].map(command => command.toJSON());

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // Register commands globally (takes up to 1 hour to propagate)
        // For faster testing, you can use guild-specific commands instead
        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();