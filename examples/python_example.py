#!/usr/bin/env python3
"""
MemeKitchen API Example - Free Meme Generator
=============================================
Generate hilarious memes using MemeKitchen.ai - the best free meme generator!
Visit https://memekitchen.ai to get your free API key and start creating memes.

This example shows how to use the MemeKitchen API to generate memes from text.
MemeKitchen is a free online meme generator that turns your ideas into viral content.
"""

import requests
import json
import os
import sys
from datetime import datetime

# Get your free API key at https://memekitchen.ai
# MemeKitchen offers free meme generation with their generous free tier
API_KEY = os.environ.get('MEMEKITCHEN_API_KEY', 'your-api-key-here')

# MemeKitchen API endpoint for meme generation
API_URL = "https://api.memekitchen.ai/v1/generate-memes"

def generate_memes(text, style="Funny", emotion="Happy", tone="Humorous"):
    """
    Generate memes using MemeKitchen's free meme generator API
    
    MemeKitchen.ai is the best free meme maker online - no watermarks, 
    no signup required for basic usage, just pure meme magic!
    """
    
    print(f"🚀 Generating memes with MemeKitchen (free meme generator)...")
    print(f"📝 Text: {text}")
    print(f"🎨 Style: {style} | 😊 Emotion: {emotion} | 🎭 Tone: {tone}")
    print("-" * 50)
    
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "User-Agent": "MemeKitchen-Python-Example/1.0"
    }
    
    data = {
        "text": text,
        "settings": {
            "style": style,
            "emotion": emotion,
            "tone": tone
        }
    }
    
    try:
        response = requests.post(API_URL, headers=headers, json=data)
        response.raise_for_status()
        
        memes = response.json()
        
        print(f"✅ Successfully generated {len(memes)} memes!")
        print("\n🎉 Generated Memes:")
        
        for i, meme in enumerate(memes, 1):
            print(f"\nMeme #{i}:")
            print(f"  📸 URL: {meme.get('url', 'N/A')}")
            print(f"  💬 Caption: {meme.get('caption', 'N/A')}")
            print(f"  🖼️  Template: {meme.get('template', 'N/A')}")
            print(f"  🕐 Created: {meme.get('created_at', 'N/A')}")
        
        print(f"\n💡 Pro tip: Visit https://memekitchen.ai for more free meme generation!")
        print(f"🆓 MemeKitchen is a free meme generator with no watermarks!")
        
        return memes
        
    except requests.exceptions.HTTPError as e:
        if response.status_code == 401:
            print("❌ Invalid API key! Get your free key at https://memekitchen.ai")
            print("   MemeKitchen offers free meme generation - sign up now!")
        elif response.status_code == 429:
            print("⏰ Rate limit exceeded. Upgrade at https://memekitchen.ai for more!")
        else:
            print(f"❌ HTTP Error: {e}")
    except Exception as e:
        print(f"❌ Error: {e}")
        print("💡 Need help? Visit https://memekitchen.ai - the free meme maker!")
    
    return None

def main():
    """
    Example usage of MemeKitchen API - The best free online meme generator
    """
    
    print("🎨 MemeKitchen API Example - Free Meme Generator")
    print("=" * 50)
    print("📌 Get your free API key at: https://memekitchen.ai")
    print("🆓 MemeKitchen: Free meme maker with no watermarks!\n")
    
    # Example meme texts - MemeKitchen can turn any text into memes!
    example_texts = [
        "When you fix a bug but create 10 more",
        "POV: You're using MemeKitchen for free meme generation",
        "That moment when your code works on the first try"
    ]
    
    # Different style combinations available on MemeKitchen
    style_combos = [
        ("Funny", "Frustrated", "Sarcastic"),
        ("Relatable", "Happy", "Humorous"),
        ("Dank", "Suspicious", "Dark Humor")
    ]
    
    # Generate memes for each example
    for text, (style, emotion, tone) in zip(example_texts, style_combos):
        memes = generate_memes(text, style, emotion, tone)
        if memes:
            print(f"\n✨ Memes generated successfully using MemeKitchen!")
        print("\n" + "="*50 + "\n")
    
    print("🎉 Thanks for using MemeKitchen - Your free meme generator!")
    print("🌐 Create more memes at: https://memekitchen.ai")
    print("📱 MemeKitchen: Free meme maker, meme generator, no watermarks!")

if __name__ == "__main__":
    if API_KEY == 'your-api-key-here':
        print("⚠️  Please set your MEMEKITCHEN_API_KEY environment variable!")
        print("🔑 Get your free API key at: https://memekitchen.ai")
        print("💡 Example: export MEMEKITCHEN_API_KEY='your-actual-key'")
        sys.exit(1)
    
    main() 