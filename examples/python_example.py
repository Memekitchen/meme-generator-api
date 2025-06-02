#!/usr/bin/env python3
"""
MemeKitchen API Example - Free Meme Video Generator
===================================================
Generate hilarious meme videos using MemeKitchen.ai - the best free meme generator!
Visit https://memekitchen.ai to get your free API key and start creating memes.

This example shows how to use the MemeKitchen API to:
1. Generate memes from text
2. Render them into a video
3. Check rendering status
4. Monitor your usage

MemeKitchen is a free online meme generator that turns your ideas into viral content.
"""

import requests
import json
import os
import sys
import time
from datetime import datetime

# Get your free API key at https://memekitchen.ai
# MemeKitchen offers free meme generation with their generous free tier
API_KEY = os.environ.get('MEMEKITCHEN_API_KEY', 'your-api-key-here')

# MemeKitchen API base URL for all endpoints
BASE_URL = "https://api.memekitchen.ai"

def generate_memes(text, emotion="funny", language="English", memecount=3):
    """
    Generate memes using MemeKitchen's free meme generator API
    
    MemeKitchen.ai is the best free meme maker online - no watermarks, 
    no signup required for basic usage, just pure meme magic!
    """
    
    print(f"🚀 Generating {memecount} memes with MemeKitchen (free meme generator)...")
    print(f"📝 Text: {text}")
    print(f"😂 Emotion: {emotion} | 🌐 Language: {language}")
    print("-" * 50)
    
    headers = {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
        "User-Agent": "MemeKitchen-Python-Example/1.0"
    }
    
    data = {
        "caption": {
            "text": text,
            "emotion": emotion,
            "language": language
        },
        "memecount": memecount
    }
    
    try:
        response = requests.post(f"{BASE_URL}/meme/generate", headers=headers, json=data)
        response.raise_for_status()
        
        memes = response.json()
        
        print(f"✅ Successfully generated {len(memes)} memes!")
        print("\n🎉 Generated Memes:")
        
        for i, meme in enumerate(memes, 1):
            print(f"\nMeme #{i}:")
            print(f"  📸 Image: {meme.get('img', 'N/A')}")
            print(f"  🎬 Video: {meme.get('video', 'N/A')}")
            print(f"  💬 Caption: {meme.get('caption', 'N/A')}")
        
        return memes
        
    except requests.exceptions.HTTPError as e:
        if response.status_code == 401:
            print("❌ Invalid API key! Get your free key at https://memekitchen.ai")
            print("   MemeKitchen offers free meme generation - sign up now!")
        elif response.status_code == 429:
            print("⏰ Rate limit exceeded. Upgrade at https://memekitchen.ai for more!")
        else:
            print(f"❌ HTTP Error: {e}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")
        print("💡 Need help? Visit https://memekitchen.ai - the free meme maker!")
    
    return []

def render_video(memes):
    """
    Render memes into a video using MemeKitchen's video generation
    Uses the actual img and video URLs from the generated memes
    """
    print(f"\n🎬 Rendering {len(memes)} memes into video...")
    
    headers = {
        "x-api-key": API_KEY,
        "Content-Type": "application/json"
    }
    
    # Create render requests from the generated memes
    render_requests = []
    for i, meme in enumerate(memes, 1):
        print(f"  📦 Processing meme {i}: {meme.get('caption', 'No caption')[:50]}...")
        
        render_request = {
            "media": {
                "image": meme.get("img"),  # Use the actual image URL from generate response
                "video": meme.get("video"),  # Use the actual video URL from generate response
                "duration": 9,
                "watermark": True,
                "width": 720,
                "height": 1280
            },
            "watermark": {
                "location": "bottom left",
                "image": "https://iaxeqmvimwumknjkrbqn.supabase.co/storage/v1/object/public/memegen/watermarks/watermark-j2Mq6SIX92",
                "size": 100,
                "opacity": 1,
                "padding": 0
            },
            "caption": {
                "text": meme.get("caption", ""),  # Use the actual caption from generate response
                "position": {
                    "x": 0,
                    "y": -450
                },
                "style": {
                    "font": "Proxima Nova",
                    "size": 20,
                    "scalingFactor": 2.222222,
                    "bold": True,
                    "italic": False,
                    "underline": False,
                    "color": "#333333",
                    "backgroundColor": "#FFFFFF",
                    "borderRadius": 4,
                    "padding": 8,
                    "align": "center"
                },
                "effects": {
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "opacity": {
                        "text": 1,
                        "background": 1
                    }
                }
            }
        }
        render_requests.append(render_request)
    
    try:
        response = requests.post(f"{BASE_URL}/render", headers=headers, json=render_requests)
        response.raise_for_status()
        
        result = response.json()
        job_id = result.get('jobId')
        
        print(f"✅ Render job started!")
        print(f"🎬 Job ID: {job_id}")
        print(f"💬 {result.get('message', '')}")
        print(f"📊 Status URL: {result.get('statusUrl', '')}")
        
        return job_id
        
    except Exception as e:
        print(f"❌ Error starting render: {e}")
        if hasattr(e, 'response'):
            print(f"Response: {e.response.text}")
        return None

def check_render_status(job_id):
    """
    Check the status of video rendering
    """
    headers = {
        "x-api-key": API_KEY
    }
    
    try:
        response = requests.get(f"{BASE_URL}/render/status/{job_id}", headers=headers)
        response.raise_for_status()
        
        status = response.json()
        return status
        
    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 404:
            print(f"❌ Render job not found: {job_id}")
            return {"state": "not_found", "error": "Job not found"}
        else:
            print(f"❌ Error checking status: {e}")
            return None
    except Exception as e:
        print(f"❌ Error checking status: {e}")
        return None

def wait_for_video(job_id, max_wait=300):
    """
    Wait for video rendering to complete
    """
    print("\n⏳ Waiting for video to render...")
    start_time = time.time()
    
    while time.time() - start_time < max_wait:
        status = check_render_status(job_id)
        
        if not status:
            print("❌ Failed to check status")
            return None
            
        current_state = status.get('state')
        
        if current_state == 'completed':
            result = status.get('result', {})
            video_url = result.get('videoUrl')
            print(f"\n🎉 Video ready!")
            print(f"🎬 Video URL: {video_url}")
            return video_url
            
        elif current_state == 'failed':
            print(f"❌ Render failed: {status.get('error', 'Unknown error')}")
            return None
            
        elif current_state == 'not_found':
            print(f"❌ Job not found: {job_id}")
            return None
            
        else:
            progress = status.get('progress', 0)
            print(f"⏳ Processing... {progress}% (State: {current_state})")
            time.sleep(3)
    
    print("⏰ Timeout waiting for video")
    return None

def check_usage():
    """
    Check your MemeKitchen API usage
    """
    headers = {
        "x-api-key": API_KEY
    }
    
    try:
        response = requests.get(f"{BASE_URL}/usage", headers=headers)
        response.raise_for_status()
        
        usage_data = response.json()
        
        print("\n📊 MemeKitchen Usage Stats:")
        print(f"🎨 Current Usage: {usage_data.get('currentUsage', 0)}")
        print(f"📈 Limit: {usage_data.get('limit', 0)}")
        print(f"💰 Remaining: {usage_data.get('remaining', 0)}")
        print(f"📦 Plan: {usage_data.get('planName', 'unknown')}")
        print(f"🚨 Reached Limit: {usage_data.get('hasReachedLimit', False)}")
        
        return usage_data
        
    except Exception as e:
        print(f"❌ Error checking usage: {e}")
        return None

def main():
    """
    Complete example of MemeKitchen API - The best free online meme generator
    """
    
    print("🎨 MemeKitchen API Example - Free Meme Video Generator")
    print("=" * 60)
    print("📌 Get your free API key at: https://memekitchen.ai")
    print("🆓 MemeKitchen: Free meme maker with no watermarks!\n")
    
    # Example meme generations - MemeKitchen can turn any text into memes!
    examples = [
        {
            "text": "When you fix a bug but create 10 more",
            "emotion": "funny",
            "language": "English",
            "memecount": 3
        },
        {
            "text": "POV: You're using MemeKitchen for free meme generation",
            "emotion": "wholesome",
            "language": "English",
            "memecount": 2
        },
        {
            "text": "Learning Web Development",
            "emotion": "funny",
            "language": "English",
            "memecount": 1
        }
    ]
    
    # Process the first example through the complete flow
    example = examples[2]  # Use the "Learning Web Development" example
    
    # Step 1: Generate memes
    memes = generate_memes(
        text=example["text"],
        emotion=example["emotion"],
        language=example["language"],
        memecount=example["memecount"]
    )
    
    if memes:
        # Step 2: Render video
        job_id = render_video(memes)
        
        if job_id:
            # Step 3: Wait for video
            video_url = wait_for_video(job_id)
            
            if video_url:
                print(f"\n✨ Success! Your meme video is ready at:")
                print(f"🔗 {video_url}")
                print(f"\n💡 Share it on social media with #MemeKitchen!")
    
    # Step 4: Check usage
    print("\n" + "="*60)
    check_usage()
    
    print("\n" + "="*60)
    print("🎉 Thanks for using MemeKitchen - Your free meme generator!")
    print("🌐 Create more memes at: https://memekitchen.ai")
    print("📱 MemeKitchen: Free meme maker, meme generator, no watermarks!")
    print("🚀 Perfect for TikTok, Instagram, Twitter, Discord, and more!")

if __name__ == "__main__":
    if API_KEY == 'your-api-key-here':
        print("⚠️  Please set your MEMEKITCHEN_API_KEY environment variable!")
        print("🔑 Get your free API key at: https://memekitchen.ai")
        print("💡 Example: export MEMEKITCHEN_API_KEY='your-actual-key'")
        print("\n📚 MemeKitchen is a free online meme generator - sign up today!")
        sys.exit(1)
    
    main() 