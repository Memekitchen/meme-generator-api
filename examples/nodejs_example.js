#!/usr/bin/env node

/**
 * MemeKitchen API Example - Free Meme Video Generator
 * ===================================================
 * Create viral meme videos using MemeKitchen.ai - the best free meme generator online!
 * Visit https://memekitchen.ai to get your free API key and start making memes.
 * 
 * MemeKitchen is a free meme maker with no watermarks, perfect for social media.
 * This example demonstrates the complete flow:
 * 1. Generate memes from text
 * 2. Render them into a video
 * 3. Check rendering status
 * 4. Monitor your usage
 */

const https = require('https');

// Get your free API key at https://memekitchen.ai
const API_KEY = process.env.MEMEKITCHEN_API_KEY || 'your-api-key-here';
const API_HOSTNAME = 'api.memekitchen.ai';

/**
 * Make HTTP requests to MemeKitchen API
 */
function makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: API_HOSTNAME,
            path: path,
            method: method,
            headers: {
                'x-api-key': API_KEY,
                'User-Agent': 'MemeKitchen-NodeJS-Example/1.0'
            }
        };

        if (data) {
            const jsonData = JSON.stringify(data);
            options.headers['Content-Type'] = 'application/json';
            options.headers['Content-Length'] = jsonData.length;
        }

        const req = https.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(responseData);
                    
                    if (res.statusCode === 200) {
                        resolve(parsedData);
                    } else {
                        reject({
                            statusCode: res.statusCode,
                            data: parsedData
                        });
                    }
                } catch (e) {
                    reject({
                        statusCode: res.statusCode,
                        data: responseData
                    });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        
        req.end();
    });
}

/**
 * Generate memes using MemeKitchen's free meme generator
 */
async function generateMemes(text, emotion = 'funny', language = 'English', memecount = 3) {
    console.log(`🚀 Generating ${memecount} memes with MemeKitchen...`);
    console.log(`📝 Text: ${text}`);
    console.log('-'.repeat(50));

    const data = {
        caption: {
            text: text,
            emotion: emotion,
            language: language
        },
        memecount: memecount
    };

    try {
        const memes = await makeRequest('POST', '/meme/generate', data);
        
        console.log(`✅ Successfully generated ${memes.length} memes!`);
        console.log('\n🎉 Generated Memes:');
        
        memes.forEach((meme, index) => {
            console.log(`\nMeme #${index + 1}:`);
            console.log(`  📸 Image: ${meme.img || 'N/A'}`);
            console.log(`  🎬 Video: ${meme.video || 'N/A'}`);
            console.log(`  💬 Caption: ${meme.caption || 'N/A'}`);
        });
        
        return memes;
    } catch (error) {
        if (error.statusCode === 401) {
            console.error('❌ Invalid API key! Get your free key at https://memekitchen.ai');
        } else if (error.statusCode === 429) {
            console.error('⏰ Rate limit exceeded. Upgrade at https://memekitchen.ai!');
        } else {
            console.error(`❌ Error: ${error.message || JSON.stringify(error)}`);
        }
        throw error;
    }
}

/**
 * Render memes into a video using actual meme data
 */
async function renderVideo(memes) {
    console.log(`\n🎬 Rendering ${memes.length} memes into video...`);

    // Create render requests from the generated memes
    const renderRequests = memes.map((meme, index) => {
        console.log(`  📦 Processing meme ${index + 1}: ${(meme.caption || 'No caption').substring(0, 50)}...`);
        
        return {
            media: {
                image: meme.img,
                video: meme.video,
                duration: 9,
                watermark: true,
                width: 720,
                height: 1280
            },
                         watermark: {
                 location: "bottom left",
                 image: "https://iaxeqmvimwumknjkrbqn.supabase.co/storage/v1/object/public/memegen/watermarks/watermark-j2Mq6SIX92",
                 size: 100,
                 opacity: 1,
                 padding: 0
             },
            caption: {
                text: meme.caption || "",
                                 position: { x: 0, y: -450 },
                style: {
                    font: "Proxima Nova",
                    size: 20,
                    scalingFactor: 2.222222,
                    bold: true,
                    italic: false,
                    underline: false,
                    color: "#333333",
                    backgroundColor: "#FFFFFF",
                    borderRadius: 4,
                    padding: 8,
                    align: "center"
                },
                effects: {
                    stroke: { width: 0, color: "#000000" },
                    opacity: { text: 1, background: 1 }
                }
            }
        };
    });

    try {
        const result = await makeRequest('POST', '/render', renderRequests);
        
        console.log(`✅ Render job started!`);
        console.log(`🎬 Job ID: ${result.jobId}`);
        console.log(`💬 ${result.message || ''}`);
        
        return result.jobId;
    } catch (error) {
        console.error(`❌ Error starting render: ${error.message || JSON.stringify(error)}`);
        throw error;
    }
}

/**
 * Check render status
 */
async function checkRenderStatus(jobId) {
    try {
        const status = await makeRequest('GET', `/render/status/${jobId}`);
        return status;
    } catch (error) {
        if (error.statusCode === 404) {
            return { state: 'not_found', error: 'Job not found' };
        }
        throw error;
    }
}

/**
 * Wait for video to be ready
 */
async function waitForVideo(jobId, maxWait = 300) {
    console.log('\n⏳ Waiting for video to render...');
    const startTime = Date.now();
    
    while ((Date.now() - startTime) / 1000 < maxWait) {
        try {
            const status = await checkRenderStatus(jobId);
            
            if (status.state === 'completed') {
                const videoUrl = status.result?.videoUrl;
                console.log(`\n🎉 Video ready!`);
                console.log(`🎬 Video URL: ${videoUrl}`);
                return videoUrl;
            } else if (status.state === 'failed') {
                console.error(`❌ Render failed: ${status.error || 'Unknown error'}`);
                return null;
            } else if (status.state === 'not_found') {
                console.error(`❌ Job not found: ${jobId}`);
                return null;
            } else {
                const progress = status.progress || 0;
                console.log(`⏳ Processing... ${progress}% (State: ${status.state})`);
                await new Promise(resolve => setTimeout(resolve, 3000));
            }
        } catch (error) {
            console.error('Failed to check status:', error);
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
    
    console.error('⏰ Timeout waiting for video');
    return null;
}

/**
 * Check API usage
 */
async function checkUsage() {
    try {
        const usage = await makeRequest('GET', '/usage');
        
        console.log('\n📊 MemeKitchen Usage Stats:');
        console.log(`🎨 Current Usage: ${usage.currentUsage}`);
        console.log(`📈 Limit: ${usage.limit}`);
        console.log(`💰 Remaining: ${usage.remaining}`);
        console.log(`📦 Plan: ${usage.planName}`);
        console.log(`🚨 Reached Limit: ${usage.hasReachedLimit}`);
        
        return usage;
    } catch (error) {
        console.error(`❌ Error checking usage: ${error.message || JSON.stringify(error)}`);
        throw error;
    }
}

/**
 * Main function - Complete MemeKitchen API flow
 */
async function main() {
    console.log('🎨 MemeKitchen API Example - Free Meme Video Generator');
    console.log('='.repeat(60));
    console.log('📌 Get your free API key at: https://memekitchen.ai');
    console.log('🆓 MemeKitchen: Free meme maker with no watermarks!\n');

    try {
        // Step 1: Generate memes
        const memes = await generateMemes(
            "Learning Web Development",
            "funny", 
            "English",
            2
        );
        
        if (memes && memes.length > 0) {
            // Step 2: Render video using actual meme data
            const jobId = await renderVideo(memes);
            
            if (jobId) {
                // Step 3: Wait for video
                const videoUrl = await waitForVideo(jobId);
                
                if (videoUrl) {
                    console.log(`\n✨ Success! Your meme video is ready!`);
                    console.log(`🔗 ${videoUrl}`);
                }
            }
        }
        
        // Step 4: Check usage
        console.log('\n' + '='.repeat(60));
        await checkUsage();
        
    } catch (error) {
        console.error('Failed to complete meme generation:', error.message || error);
    }

    console.log('\n' + '='.repeat(60));
    console.log('🎉 Thanks for using MemeKitchen - Your free meme generator!');
    console.log('🌐 Create more memes at: https://memekitchen.ai');
}

// Check if API key is set
if (API_KEY === 'your-api-key-here') {
    console.error('⚠️  Please set your MEMEKITCHEN_API_KEY environment variable!');
    console.error('🔑 Get your free API key at: https://memekitchen.ai');
    console.error('💡 Example: export MEMEKITCHEN_API_KEY="your-actual-key"');
    process.exit(1);
}

// Run the example
main().catch(console.error); 