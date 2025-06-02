# 🚀 MemeKitchen API - Turn Your Words Into Dank Meme Videos! 🎨

## 😂 What dis API do? 

This API be straight bussin' fr fr! 💯 It takes your boring text and transforms it into spicy meme videos that'll make everyone go "sheeeesh!" 🔥

### ✨ Features dat slap:
- 🎯 **Text → Memes**: Drop some text, get back fire memes
- 🎬 **Meme → Video**: Render multiple memes into one epic video
- 📊 **Track Usage**: Know your meme generation stats
- ⚡ **Fast AF**: No cap, results in seconds

## 🔑 Get Yo API Key First! 

Ayo! Before you can start memeing, you gotta:

1. 🌐 Go to [memekitchen.ai](https://memekitchen.ai)
2. 📝 Sign up (it's free to start, no 🧢)
3. 🎫 Get your API key from the dashboard
4. 💪 Start making memes!

## 📖 API Endpoints

### 1️⃣ Generate Memes
```
POST https://api.memekitchen.ai/meme/generate
```

Generate multiple memes from your text input.

**Request Body:**
```json
{
  "caption": {
    "text": "Learning Web Development",
    "emotion": "funny",
    "language": "English"
  },
  "memecount": 3
}
```

**Response:**
```json
[
  {
    "img": "https://example.com/memes/image1.jpg",
    "caption": "When you finally fix the bug and feel like a coding genius for five minutes.",
    "video": "https://example.com/videos/video1.mp4"
  },
  {
    "img": "https://example.com/memes/image2.jpg", 
    "caption": "When you fix one bug and three more show up like they were waiting in line.",
    "video": "https://example.com/videos/video2.mp4"
  }
]
```

### 2️⃣ Render Video
```
POST https://api.memekitchen.ai/render
```

Stitch your memes together into a fire video! 🎬

**Request Body:**
```json
[
  {
    "media": {
      "image": "https://example.com/memes/image1.jpg",
      "video": "https://example.com/videos/video1.mp4",
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
      "text": "When you finally fix the bug and feel like a coding genius",
      "position": { "x": 0, "y": -450 },
      "style": {
        "font": "Proxima Nova",
        "size": 20,
        "color": "#333333",
        "backgroundColor": "#FFFFFF"
      }
    }
  }
]
```

**Response:**
```json
{
  "message": "Render job submitted",
  "jobId": "9d64b567-acdd-438b-a7d1-be9b45895a42",
  "statusUrl": "/render/status/9d64b567-acdd-438b-a7d1-be9b45895a42"
}
```

### 3️⃣ Check Render Status
```
GET https://api.memekitchen.ai/render/status/{jobId}
```

Check if your video is ready! 

**Response (Processing):**
```json
{
  "id": "9d64b567-acdd-438b-a7d1-be9b45895a42",
  "state": "active",
  "progress": 50
}
```

**Response (Complete):**
```json
{
  "id": "9d64b567-acdd-438b-a7d1-be9b45895a42",
  "state": "completed",
  "progress": 100,
  "result": {
    "videoUrl": "https://cdn.memekitchen.ai/videos/final_789xyz.mp4"
  }
}
```

### 4️⃣ Check Usage
```
GET https://api.memekitchen.ai/usage
```

See how many memes you've been cooking! 📊

**Response:**
```json
{
  "currentUsage": 360,
  "limit": 450,
  "remaining": 90,
  "planName": "Starter",
  "hasReachedLimit": false
}
```

### Headers (for all requests):
```
x-api-key: YOUR_API_KEY
Content-Type: application/json
```

## 💻 Code Examples

Check out our complete examples in multiple languages:

### 🐍 Python Quick Start
```python
import requests

headers = {"x-api-key": "your-api-key", "Content-Type": "application/json"}

# Generate memes
memes = requests.post("https://api.memekitchen.ai/meme/generate", 
                     headers=headers, 
                     json={"caption": {"text": "Learning to code", "emotion": "funny"}, "memecount": 2}).json()

# Render video (using actual meme data)
render_data = [{"media": {"image": m["img"], "video": m["video"]}, "caption": {"text": m["caption"]}} for m in memes]
job = requests.post("https://api.memekitchen.ai/render", headers=headers, json=render_data).json()

print(f"🎬 Video rendering: {job['jobId']}")
```

### 🟨 JavaScript/Node.js Quick Start
```javascript
const API_KEY = 'your-api-key';

// Generate memes
const memes = await fetch('https://api.memekitchen.ai/meme/generate', {
  method: 'POST',
  headers: {'x-api-key': API_KEY, 'Content-Type': 'application/json'},
  body: JSON.stringify({caption: {text: "JavaScript promises", emotion: "funny"}, memecount: 2})
}).then(r => r.json());

console.log(`Generated ${memes.length} memes!`);
```

### 📁 Complete Examples Directory

For full working examples with error handling, status checking, and usage monitoring:

- [`python_example.py`](examples/python_example.py) - Complete Python implementation
- [`nodejs_example.js`](examples/nodejs_example.js) - Node.js with native HTTPS
- [`go_example.go`](examples/go_example.go) - Go implementation
- [`ruby_example.rb`](examples/ruby_example.rb) - Ruby example
- [`php_example.php`](examples/php_example.php) - PHP implementation

All examples show the complete flow: Generate → Render → Check Status → Monitor Usage

## 🎨 Available Options

### Emotions:
- `funny` - Classic humor 😂
- `sarcastic` - Spicy takes 🌶️
- `wholesome` - Pure vibes 🥰
- `savage` - No chill mode 💀
- `relatable` - It be like that 😔

### Languages:
- `English`, `Spanish`, `French`, `German`, `Portuguese`, `Italian`, `Dutch`, `Polish`, `Russian`, `Japanese`, `Korean`, `Chinese`

### Meme Count:
- Min: 1, Max: 10 (Free tier: 5)

## 🚨 Error Codes

- `400` - Bad Request (check your JSON fam)
- `401` - Unauthorized (API key invalid or missing)
- `404` - Not Found (render job doesn't exist)
- `429` - Rate Limited (slow down chief!)
- `500` - Server Error (our bad, try again)

## 📈 Rate Limits

- **Free Tier**: 20 memes/month
- **Basic Tier**: 150 memes/month
- **Starter Tier**: 450 memes/month
- **Growth Tier**: 3000 memes/month

## 🤝 Support

Need help? Hit us up:
- 📧 Email: support@memekitchen.ai
- 💬 Discord: [Join our server](https://discord.gg/memekitchen)
- 🐦 Twitter: [@memekitchen](https://twitter.com/memekitchen)

## 📜 License

MIT License - Go wild, make memes! 🚀

---

Made with 💜 and memes by the MemeKitchen team. Stay dank! 🌟
