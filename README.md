# 🚀 MemeKitchen API - Turn Your Words Into Dank Memes! 🎨

## 😂 What dis API do? 

This API be straight bussin' fr fr! 💯 It takes your boring text and transforms it into spicy memes that'll make everyone go "sheeeesh!" 🔥

### ✨ Features dat slap:
- 🎯 **Text → Meme**: Drop some text, get back fire memes
- 🎨 **Custom Styles**: Choose your vibe (Funny, Dank, Wholesome, etc.)
- 😎 **Emotion Control**: Happy, Sad, Angry - we got all the feels
- ⚡ **Fast AF**: No cap, results in seconds

## 🔑 Get Yo API Key First! 

Ayo! Before you can start memeing, you gotta:

1. 🌐 Go to [memekitchen.ai](https://memekitchen.ai)
2. 📝 Sign up (it's free to start, no 🧢)
3. 🎫 Get your API key from the dashboard
4. 💪 Start making memes!

## 📖 API Endpoint

```
POST https://api.memekitchen.ai/v1/generate-memes
```

### Request Body:
```json
{
  "text": "When you fix a bug but create 10 more",
  "settings": {
    "style": "Funny",
    "emotion": "Frustrated",
    "tone": "Sarcastic"
  }
}
```

### Headers:
```
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

## 💻 Code Examples (Copy Pasta Ready!)

### 🐍 Python
```python
import requests
import json

API_KEY = "your-api-key-here"
API_URL = "https://api.memekitchen.ai/v1/generate-memes"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

data = {
    "text": "When the code works on first try",
    "settings": {
        "style": "Funny",
        "emotion": "Suspicious",
        "tone": "Humorous"
    }
}

response = requests.post(API_URL, headers=headers, json=data)
memes = response.json()
print(f"Generated {len(memes)} memes! 🔥")
```

### 🟨 JavaScript/Node.js
```javascript
const axios = require('axios');

const API_KEY = 'your-api-key-here';
const API_URL = 'https://api.memekitchen.ai/v1/generate-memes';

async function generateMemes() {
  try {
    const response = await axios.post(API_URL, {
      text: "POV: You're debugging at 3 AM",
      settings: {
        style: "Relatable",
        emotion: "Tired",
        tone: "Dark Humor"
      }
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`Generated ${response.data.length} memes! 🚀`);
  } catch (error) {
    console.error('Bruh moment:', error);
  }
}

generateMemes();
```

### 🌐 TypeScript
```typescript
interface MemeSettings {
  style: 'Funny' | 'Dank' | 'Wholesome' | 'Relatable';
  emotion: 'Happy' | 'Sad' | 'Angry' | 'Surprised' | 'Tired';
  tone: 'Humorous' | 'Sarcastic' | 'Dark Humor' | 'Wholesome';
}

interface MemeRequest {
  text: string;
  settings: MemeSettings;
}

async function generateMemes(request: MemeRequest): Promise<any[]> {
  const response = await fetch('https://api.memekitchen.ai/v1/generate-memes', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.MEMEKITCHEN_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });
  
  return response.json();
}

// Usage
generateMemes({
  text: "When you close 200 Chrome tabs and your RAM thanks you",
  settings: {
    style: 'Relatable',
    emotion: 'Happy',
    tone: 'Humorous'
  }
}).then(memes => console.log(`Memes acquired: ${memes.length} 💎`));
```

### ☕ Java
```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

public class MemeGenerator {
    private static final String API_KEY = "your-api-key-here";
    private static final String API_URL = "https://api.memekitchen.ai/v1/generate-memes";
    
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        
        String requestBody = """
        {
            "text": "When your code compiles without errors",
            "settings": {
                "style": "Funny",
                "emotion": "Suspicious",
                "tone": "Sarcastic"
            }
        }
        """;
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(API_URL))
            .header("Authorization", "Bearer " + API_KEY)
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(requestBody))
            .build();
            
        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());
            
        System.out.println("Memes generated! Status: " + response.statusCode());
    }
}
```

### 🦀 Rust
```rust
use reqwest;
use serde_json::json;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let api_key = "your-api-key-here";
    let client = reqwest::Client::new();
    
    let response = client
        .post("https://api.memekitchen.ai/v1/generate-memes")
        .header("Authorization", format!("Bearer {}", api_key))
        .json(&json!({
            "text": "When Rust compiler finally accepts your code",
            "settings": {
                "style": "Dank",
                "emotion": "Happy",
                "tone": "Humorous"
            }
        }))
        .send()
        .await?;
        
    println!("Memes status: {} 🦀", response.status());
    Ok(())
}
```

### 🐹 Go
```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    apiKey := "your-api-key-here"
    apiURL := "https://api.memekitchen.ai/v1/generate-memes"
    
    requestBody, _ := json.Marshal(map[string]interface{}{
        "text": "When your Go routine doesn't panic",
        "settings": map[string]string{
            "style": "Funny",
            "emotion": "Surprised",
            "tone": "Humorous",
        },
    })
    
    req, _ := http.NewRequest("POST", apiURL, bytes.NewBuffer(requestBody))
    req.Header.Set("Authorization", "Bearer " + apiKey)
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()
    
    fmt.Printf("Memes generated! Status: %d 🔥\n", resp.StatusCode)
}
```

### 💎 Ruby
```ruby
require 'net/http'
require 'json'
require 'uri'

api_key = 'your-api-key-here'
uri = URI('https://api.memekitchen.ai/v1/generate-memes')

http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request['Authorization'] = "Bearer #{api_key}"
request['Content-Type'] = 'application/json'

request.body = {
  text: "When your regex works on the first try",
  settings: {
    style: "Funny",
    emotion: "Suspicious",
    tone: "Sarcastic"
  }
}.to_json

response = http.request(request)
puts "Memes generated! Status: #{response.code} 💎"
```

### 🐘 PHP
```php
<?php
$apiKey = 'your-api-key-here';
$apiUrl = 'https://api.memekitchen.ai/v1/generate-memes';

$data = [
    'text' => 'When PHP is actually your favorite language',
    'settings' => [
        'style' => 'Funny',
        'emotion' => 'Happy',
        'tone' => 'Humorous'
    ]
];

$options = [
    'http' => [
        'header' => [
            "Authorization: Bearer $apiKey",
            "Content-Type: application/json"
        ],
        'method' => 'POST',
        'content' => json_encode($data)
    ]
];

$context = stream_context_create($options);
$result = file_get_contents($apiUrl, false, $context);

echo "Memes generated! 🐘\n";
?>
```

### 🎯 C#/.NET
```csharp
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

class MemeGenerator
{
    private static readonly string ApiKey = "your-api-key-here";
    private static readonly string ApiUrl = "https://api.memekitchen.ai/v1/generate-memes";
    
    static async Task Main()
    {
        using var client = new HttpClient();
        client.DefaultRequestHeaders.Add("Authorization", $"Bearer {ApiKey}");
        
        var request = new
        {
            text = "When your C# code runs faster than your C++ code",
            settings = new
            {
                style = "Funny",
                emotion = "Surprised",
                tone = "Humorous"
            }
        };
        
        var json = JsonConvert.SerializeObject(request);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        
        var response = await client.PostAsync(ApiUrl, content);
        Console.WriteLine($"Memes generated! Status: {response.StatusCode} 🎯");
    }
}
```

### 🍎 Swift
```swift
import Foundation

let apiKey = "your-api-key-here"
let apiUrl = URL(string: "https://api.memekitchen.ai/v1/generate-memes")!

var request = URLRequest(url: apiUrl)
request.httpMethod = "POST"
request.setValue("Bearer \(apiKey)", forHTTPHeaderField: "Authorization")
request.setValue("application/json", forHTTPHeaderField: "Content-Type")

let requestBody: [String: Any] = [
    "text": "When Xcode actually works without crashing",
    "settings": [
        "style": "Funny",
        "emotion": "Suspicious",
        "tone": "Sarcastic"
    ]
]

request.httpBody = try? JSONSerialization.data(withJSONObject: requestBody)

URLSession.shared.dataTask(with: request) { data, response, error in
    if let httpResponse = response as? HTTPURLResponse {
        print("Memes generated! Status: \(httpResponse.statusCode) 🍎")
    }
}.resume()
```

### 🔧 cURL (for the terminal gang)
```bash
curl -X POST https://api.memekitchen.ai/v1/generate-memes \
  -H "Authorization: Bearer your-api-key-here" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "When your bash script works without sudo",
    "settings": {
      "style": "Funny",
      "emotion": "Surprised",
      "tone": "Humorous"
    }
  }'
```

## 📊 Response Format

The API returns an array of meme objects:

```json
[
  {
    "id": "meme_123",
    "url": "https://cdn.memekitchen.ai/memes/abc123.jpg",
    "caption": "Your generated meme caption",
    "template": "Drake",
    "created_at": "2024-01-01T00:00:00Z"
  },
  // More memes...
]
```

## 🎨 Available Settings

### Styles:
- `Funny` - Classic humor vibes 😂
- `Dank` - For the cultured memers 🗿
- `Wholesome` - Pure and heartwarming 🥰
- `Relatable` - It be like that sometimes 😔

### Emotions:
- `Happy` 😊
- `Sad` 😢
- `Angry` 😠
- `Surprised` 😲
- `Tired` 😴
- `Suspicious` 🤨
- `Frustrated` 😤

### Tones:
- `Humorous` - Light and fun
- `Sarcastic` - For when you're feeling spicy
- `Dark Humor` - Edgy but not too edgy
- `Wholesome` - Good vibes only

## 🚨 Error Codes

- `400` - Bad Request (check your JSON fam)
- `401` - Unauthorized (API key invalid or missing)
- `429` - Rate Limited (slow down chief!)
- `500` - Server Error (our bad, try again)

## 📈 Rate Limits

- **Free Tier**: 100 memes/day
- **Pro Tier**: 10,000 memes/day
- **Enterprise**: No limits, just vibes

## 🤝 Support

Need help? Hit us up:
- 📧 Email: support@memekitchen.ai
- 💬 Discord: [Join our server](https://discord.gg/memekitchen)
- 🐦 Twitter: [@memekitchen](https://twitter.com/memekitchen)

## 📜 License

MIT License - Go wild, make memes! 🚀

---

Made with 💜 and memes by the MemeKitchen team. Stay dank! 🌟
