# 🌾 Gemini Proxy Server

 A lightweight Node.js proxy server that acts as a bridge between your C# backend and Google's Gemini API.

---

## 🚀 Features

- ✅ **Generic AI Assistant** - Answers any question (agriculture, travel, general, etc.)
- ✅ **3-Part Response Structure** - INTRODUCTION, MAIN CONTENT, CONCLUSION
- ✅ **Markdown Format** - Clean, readable output with proper headings
- ✅ **Auto Model Fallback** - Automatically switches between Gemini models if one is busy
- ✅ **CORS Enabled** - Can be called from any frontend/backend
- ✅ **Simple & Reusable** - One proxy server for all your projects

---

## 📁 Project Structure

```
gemini-proxy-server/
├── src/
│   ├── controllers/
│   │   └── geminiController.js   # Request handler
│   ├── services/
│   │   └── geminiService.js      # Gemini API caller
│   ├── config/
│   └── utils/
├── .env                           # Environment variables
├── .gitignore
├── package.json
├── server.js                      # Main entry point
└── README.md
```

---

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Axios** - HTTP client for Gemini API
- **pnpm** - Fast package manager

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/gemini-proxy-server.git
cd gemini-proxy-server

# 2. Install dependencies
pnpm install

# 3. Create .env file (see Configuration section below)

# 4. Start the server
node server.js
```

---

## ⚙️ Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
GEMINI_API_KEY=your-gemini-api-key-here
```

> **Note:** The `GEMINI_URL` is hardcoded in the service file. You don't need to add it to `.env`.

---

## 🚀 API Endpoints

### 1. Health Check

```http
GET /health
```

**Response:**

```json
{
    "status": "ok",
    "timestamp": "2026-07-06T10:00:00.000Z"
}
```

### 2. AI Chat Proxy

```http
POST /api/gemini-proxy
Content-Type: application/json
```

**Request Body:**

```json
{
    "prompt": "Your question here"
}
```

**Response:**

```json
{
    "success": true,
    "reply": "Structured answer with INTRODUCTION, MAIN CONTENT, CONCLUSION"
}
```

### Example Request (from C#)

```csharp
var request = new { prompt = "စပါးဘယ်လိုစိုက်ရမလဲ" };
var json = JsonSerializer.Serialize(request);
var content = new StringContent(json, Encoding.UTF8, "application/json");
var response = await httpClient.PostAsync("https://your-proxy.onrender.com/api/gemini-proxy", content);
```

---

## 🔄 How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                         C# Backend                            │
│  ┌───────────────────────────────────────────────────────────┐│
│  │  Build Prompt + Instructions                              ││
│  │  (Project-specific instructions)                         ││
│  └───────────────────────────────────────────────────────────┘│
│                              │                                │
│                              ▼                                │
│              POST /api/gemini-proxy                          │
│              { "prompt": "..." }                             │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Node.js Proxy Server                      │
│  ┌───────────────────────────────────────────────────────────┐│
│  │  Generic Proxy (Reusable for ALL Projects)               ││
│  │  - Receives prompt from C#                              ││
│  │  - Forwards to Gemini API                               ││
│  │  - Returns response                                     ││
│  └───────────────────────────────────────────────────────────┘│
│                              │                                │
│                              ▼                                │
│              Gemini API (Google)                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 🧪 Testing

### Using cURL

```bash
curl -X POST http://localhost:3000/api/gemini-proxy \
  -H "Content-Type: application/json" \
  -d '{"prompt": "What is the best way to grow rice?"}'
```

### Using Postman

1. Method: `POST`
2. URL: `http://localhost:3000/api/gemini-proxy`
3. Body: `raw` → `JSON`
4. Enter: `{"prompt": "Your question here"}`

---

## ☁️ Deployment (Render)

1. Push the code to GitHub
2. Go to [Render.com](https://render.com)
3. Click **"New Web Service"**
4. Connect your GitHub repository
5. Configure:
   - **Build Command:** `pnpm install`
   - **Start Command:** `node server.js`
   - **Environment Variables:** Add `GEMINI_API_KEY`
6. Click **"Create Web Service"**

> **Important:** Select a region where Gemini API is available (e.g., Frankfurt, Singapore)

---

## 🛡️ Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 3000) | No |
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes |

---

## 📝 Response Format

All responses follow a consistent 3-part structure:

```
### INTRODUCTION (နိဒါန်း)
Brief introduction to the topic

### MAIN CONTENT (အကြောင်းအရာ)
Detailed explanation with bullet points and numbered lists

### CONCLUSION (နိဂုံး)
Summary and final advice
```

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| `ERR_MODULE_NOT_FOUND` | Make sure all imports have `.js` extension |
| `Invalid URL` | Check your `.env` file has `GEMINI_API_KEY` |
| `503 Service Unavailable` | Server auto-falls back to other models. Wait and retry |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

## 🙏 Acknowledgments

- **Google Gemini API** - For providing the AI capabilities
- **Render** - For free hosting

---

## 📧 Contact

For questions or support, please create an issue on GitHub.

---

## ⭐ Quick Links

- [GitHub Repository](https://github.com/your-username/gemini-proxy-server)
- [Live Demo](https://your-proxy.onrender.com/health)
- [Issue Tracker](https://github.com/your-username/gemini-proxy-server/issues)

---

*Made with ❤️ for developers in Myanmar*