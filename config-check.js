require('dotenv').config();

console.log('🔍 Discord Overwatch Bot Configuration Check\n');

const requiredEnvVars = [
    'DISCORD_TOKEN',
    'GEMINI_API_KEY'
];

const optionalEnvVars = [
    'DISCORD_CLIENT_ID',
    'BOT_PREFIX',
    'SUMMON_COMMAND',
    'DISMISS_COMMAND'
];

let allGood = true;

// Check required environment variables
console.log('📋 Required Configuration:');
requiredEnvVars.forEach(varName => {
    const value = process.env[varName];
    if (value && value !== 'your_discord_bot_token_here' && value !== 'your_gemini_api_key_here') {
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
const prefix = process.env.BOT_PREFIX || '!';
const summonCmd = process.env.SUMMON_COMMAND || 'summon';
const dismissCmd = process.env.DISMISS_COMMAND || 'dismiss';

console.log(`   Summon: ${prefix}${summonCmd}`);
console.log(`   Dismiss: ${prefix}${dismissCmd}`);

if (allGood) {
    console.log('\n🎉 All required configuration is set! You can start the bot with: npm start');
} else {
    console.log('\n⚠️  Please configure the missing environment variables in your .env file');
    console.log('   Copy .env.example to .env and fill in your credentials');
}