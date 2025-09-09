require('dotenv').config();

// Configuration validation
const requiredEnvVars = ['DISCORD_TOKEN', 'GEMINI_API_KEY'];
const missingVars = requiredEnvVars.filter(varName => {
    const value = process.env[varName];
    return !value || 
           value === 'your_discord_bot_token_here' || 
           value === 'your_gemini_api_key_here';
});

if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => {
        console.error(`   - ${varName}`);
    });
    console.error('\n💡 Run "npm run config-check" for detailed setup instructions');
    console.error('💡 Copy .env.example to .env and configure your credentials');
    process.exit(1);
}

console.log('✅ Configuration validated, starting Discord Overwatch Bot...');

// Start the bot
require('./index.js');