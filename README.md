# 🎨 MemeKitchen API Examples

Welcome to the MemeKitchen API examples directory! These examples demonstrate how to use the MemeKitchen API to generate memes and render them into videos.

## 🚀 Quick Start

1. Get your free API key at [memekitchen.ai](https://memekitchen.ai)
2. Set your API key as an environment variable:
   ```bash
   export MEMEKITCHEN_API_KEY="your-api-key-here"
   ```
3. Run any example!

## 📁 Available Examples

### ✅ **Updated Examples** (Correct API Structure)

These examples use the current API endpoints and data structures:

- **[`python_example.py`](examples/python_example.py)** - 🐍 Complete Python implementation 
- **[`nodejs_example.js`](examples/nodejs_example.js)** - 🟨 Node.js with native HTTPS


## 🛠️ API Flow

All examples demonstrate the complete flow:

1. **Generate Memes** (`POST /meme/generate`)
   - Send text, emotion, language, memecount
   - Receive array of memes with `img`, `video`, `caption`

2. **Render Video** (`POST /render`) 
   - Use actual meme data from step 1
   - Send array of render requests with media and caption styling

3. **Check Status** (`GET /render/status/{jobId}`)
   - Poll until `state: "completed"`
   - Get final `videoUrl` from result

4. **Monitor Usage** (`GET /usage`)
   - Check `currentUsage`, `remaining`, `planName`

## 🎯 Key API Structure

```json
// Generate Request
{
  "caption": {
    "text": "Learning Web Development",
    "emotion": "funny", 
    "language": "English"
  },
  "memecount": 2
}

// Generate Response 
[
  {
    "img": "https://example.com/image1.jpg",
    "video": "https://example.com/video1.mp4", 
    "caption": "When you fix one bug and three more appear"
  }
]

// Render Request (using meme data)
[
  {
    "media": {
      "image": "https://example.com/image1.jpg",  // from meme.img
      "video": "https://example.com/video1.mp4",   // from meme.video
      "duration": 9,
      "watermark": true,
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
      "text": "When you fix one bug and three more appear", // from meme.caption
      "position": {"x": 0, "y": -450}
    }
  }
]
```

## 💡 Best Practices

- **Use actual meme data**: Always use the `img`, `video`, and `caption` from `/meme/generate` in your render requests
- **Handle errors**: Check for 401 (invalid key), 429 (rate limit), 404 (job not found)
- **Poll status**: Check render status every 2-3 seconds until completion
- **Monitor usage**: Track your API usage to avoid hitting limits

## 🔗 Reference Implementation

The **Python example** (`python_example.py`) is the most up-to-date reference showing:
- Correct endpoint usage (`/meme/generate`, `/render`, etc.)
- Proper error handling
- Real meme data flow from generate → render
- Usage monitoring

Use it as the primary reference for implementing in any language!

---

Made with 💜 by MemeKitchen team 