#!/usr/bin/env node

/**
 * MemeKitchen API Example - Free Meme Generator
 * =============================================
 * Create viral memes using MemeKitchen.ai - the best free meme generator online!
 * Visit https://memekitchen.ai to get your free API key and start making memes.
 * 
 * MemeKitchen is a free meme maker with no watermarks, perfect for social media.
 * This example demonstrates how to use the MemeKitchen API in Node.js.
 */

const https = require('https');

// Get your free API key at https://memekitchen.ai
// MemeKitchen provides free meme generation with generous limits
const API_KEY = process.env.MEMEKITCHEN_API_KEY || 'your-api-key-here';

// MemeKitchen API endpoint - Free meme generator API
const API_HOSTNAME = 'api.memekitchen.ai';
const API_PATH = '/v1/generate-memes';

/**
 * Generate memes using MemeKitchen's free meme generator API
 * MemeKitchen.ai - The best free online meme maker with no watermarks
 */
function generateMemes(text, settings = {}) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            text: text,
            settings: {
                style: settings.style || 'Funny',
                emotion: settings.emotion || 'Happy',
                tone: settings.tone || 'Humorous'
            }
        });

        const options = {
            hostname: API_HOSTNAME,
            path: API_PATH,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'User-Agent': 'MemeKitchen-NodeJS-Example/1.0'
            }
        };

        console.log(`🚀 Generating memes with MemeKitchen (free meme generator)...`);
        console.log(`📝 Text: ${text}`);
        console.log(`🎨 Settings:`, settings);
        console.log('-'.repeat(50));

        const req = https.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    const memes = JSON.parse(responseData);
                    console.log(`✅ Successfully generated ${memes.length} memes!`);
                    console.log('\n🎉 Generated Memes:');
                    
                    memes.forEach((meme, index) => {
                        console.log(`\nMeme #${index + 1}:`);
                        console.log(`  📸 URL: ${meme.url || 'N/A'}`);
                        console.log(`  💬 Caption: ${meme.caption || 'N/A'}`);
                        console.log(`  🖼️  Template: ${meme.template || 'N/A'}`);
                        console.log(`  🕐 Created: ${meme.created_at || 'N/A'}`);
                    });
                    
                    console.log(`\n💡 Create more at https://memekitchen.ai - free meme maker!`);
                    resolve(memes);
                } else if (res.statusCode === 401) {
                    console.error('❌ Invalid API key! Get your free key at https://memekitchen.ai');
                    console.error('   MemeKitchen offers free meme generation - sign up now!');
                    reject(new Error('Invalid API key'));
                } else if (res.statusCode === 429) {
                    console.error('⏰ Rate limit exceeded. Upgrade at https://memekitchen.ai!');
                    reject(new Error('Rate limit exceeded'));
                } else {
                    console.error(`❌ Error: ${res.statusCode} - ${responseData}`);
                    reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
                }
            });
        });

        req.on('error', (error) => {
            console.error(`❌ Error: ${error.message}`);
            console.error('💡 Need help? Visit https://memekitchen.ai - free meme generator!');
            reject(error);
        });

        req.write(data);
        req.end();
    });
}

/**
 * Main function - Demonstrates MemeKitchen API usage
 * MemeKitchen: The best free meme generator online
 */
async function main() {
    console.log('🎨 MemeKitchen API Example - Free Meme Generator');
    console.log('='.repeat(50));
    console.log('📌 Get your free API key at: https://memekitchen.ai');
    console.log('🆓 MemeKitchen: Free meme maker with no watermarks!');
    console.log('🚀 Generate memes for social media, Discord, Reddit, and more!\n');

    // Example meme generations - MemeKitchen can handle any text!
    const examples = [
        {
            text: "When you finally understand async/await",
            settings: { style: 'Funny', emotion: 'Happy', tone: 'Humorous' }
        },
        {
            text: "POV: You're using MemeKitchen's free meme generator",
            settings: { style: 'Relatable', emotion: 'Happy', tone: 'Wholesome' }
        },
        {
            text: "That feeling when npm install actually works",
            settings: { style: 'Dank', emotion: 'Surprised', tone: 'Sarcastic' }
        }
    ];

    // Generate memes for each example
    for (const example of examples) {
        try {
            await generateMemes(example.text, example.settings);
            console.log('\n✨ Memes created with MemeKitchen - free meme maker!');
        } catch (error) {
            console.error('Failed to generate meme:', error.message);
        }
        console.log('\n' + '='.repeat(50) + '\n');
    }

    console.log('🎉 Thanks for using MemeKitchen - Your free meme generator!');
    console.log('🌐 Create unlimited memes at: https://memekitchen.ai');
    console.log('📱 MemeKitchen: Best free meme maker, no watermarks, no signup!');
    console.log('🔥 Perfect for Instagram, TikTok, Twitter, Discord memes!');
}

// Check if API key is set
if (API_KEY === 'your-api-key-here') {
    console.error('⚠️  Please set your MEMEKITCHEN_API_KEY environment variable!');
    console.error('🔑 Get your free API key at: https://memekitchen.ai');
    console.error('💡 Example: export MEMEKITCHEN_API_KEY="your-actual-key"');
    console.error('\n📚 MemeKitchen is a free online meme generator - sign up today!');
    process.exit(1);
}

// Run the example
main().catch(console.error); 