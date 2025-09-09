require('dotenv').config();

console.log('🔍 Discord Overwatch Bot Configuration Check\n');

const requiredEnvVars = [
    'DISCORD_TOKEN',
    'CLIENT_ID',
    'GEMINI_API_KEY'
];

const optionalEnvVars = [
    'BOT_PREFIX',
    'SUMMON_COMMAND',
    'DISMISS_COMMAND'
];

let allGood = true;

// Check required environment variables
console.log('📋 Required Configuration:');
requiredEnvVars.forEach(varName => {
    const value = process.env[varName];
    if (value && value !== 'your_discord_bot_token_here' && value !== 'your_discord_client_id_here' && value !== 'your_gemini_api_key_here') {
        console.log(`✅ ${varName}: Configured`);
    } else {
        console.log(`❌ ${varName}: Missing or using example value`);
        allGood = false;
    }
});

console.log('\n📋 Optional Configuration:');
optionalEnvVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
        console.log(`✅ ${varName}: ${value}`);
    } else {
        console.log(`⚠️  ${varName}: Using default value`);
    }
});

console.log('\n🚀 Bot Commands:');
console.log('   Summon: /summon (slash command)');
console.log('   Dismiss: /dismiss (slash command)');
console.log('\n💡 Note: After updating configuration, run "npm run deploy-commands" to register slash commands with Discord.');

if (allGood) {
    console.log('\n🎉 All required configuration is set!');
    console.log('   1. Run "npm run deploy-commands" to register slash commands');
    console.log('   2. Run "npm start" to start the bot');
} else {
    console.log('\n⚠️  Please configure the missing environment variables in your .env file');
    console.log('   Copy .env.example to .env and fill in your credentials');
}