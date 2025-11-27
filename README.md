# XO Game - Tic Tac Toe with Socket.io

A real-time multiplayer Tic Tac Toe game built with Node.js, Express, and Socket.io.

## Features

- 🎮 Real-time multiplayer gameplay
- 🎨 Beautiful, modern UI
- 📱 Responsive design
- 🔄 Game reset functionality
- 🏠 Room-based game system

## Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5000`

## How to Play

1. **Create a new game:** Click "Join Game" without entering a room ID
2. **Share the Room ID** with a friend
3. **Join a game:** Enter the Room ID and click "Join Game"
4. **Play:** Take turns making moves. The first player is X, second is O
5. **Reset:** Click "Reset Game" to play again with the same opponent
6. **New Game:** Click "New Game" to create or join a different room

## Hosting on the Web

The project is ready for hosting! It automatically detects the environment and configures itself.

### Quick Deploy Options

#### Option 1: Railway (Recommended - Easiest)

1. **Sign up** at [railway.app](https://railway.app)
2. **Click "New Project"** → **"Deploy from GitHub repo"**
3. **Select your repository**
4. **Railway will auto-detect** the configuration from `railway.json`
5. **That's it!** Your app will be live in minutes

The `railway.json` file is already configured. Railway will:
- Automatically detect Node.js
- Run `npm install` in the backend folder
- Start the server with `npm start`

#### Option 2: Render

1. **Sign up** at [render.com](https://render.com)
2. **Create a new Web Service**
3. **Connect your GitHub repository**
4. **Use the settings from `render.yaml`** (already configured):
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
5. **Deploy!**

#### Option 3: Heroku

1. **Install Heroku CLI** and login:
   ```bash
   heroku login
   ```

2. **Create and deploy:**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   heroku create your-app-name
   git push heroku main
   ```

   The `Procfile` is already configured!

3. **Your app will be live at:** `https://your-app-name.herokuapp.com`

#### Option 4: Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd backend
   vercel
   ```

3. **Follow the prompts** - Vercel will handle the rest!

#### Option 5: VPS (DigitalOcean, AWS, Linode, etc.)

1. **SSH into your server**

2. **Install Node.js (v18+):**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone your repository:**
   ```bash
   git clone <your-repo-url>
   cd XO/backend
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Set environment variables** (optional):
   ```bash
   cp env.example .env
   nano .env  # Edit as needed
   ```

6. **Use PM2 to keep it running:**
   ```bash
   npm install -g pm2
   pm2 start index.js --name xo-game
   pm2 save
   pm2 startup  # Follow the instructions
   ```

7. **Set up Nginx** as reverse proxy (recommended):
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Environment Variables

For production, you can set these environment variables (optional):

- `PORT` - Server port (defaults to 5000, hosting platforms set this automatically)
- `NODE_ENV` - Set to `production` for production
- `CORS_ORIGIN` - CORS origin (defaults to `*` for all origins)

Most hosting platforms set `PORT` automatically, so you usually don't need to configure anything!

## Environment Variables

Create a `.env` file in the backend folder (optional):
```
PORT=5000
```

## Project Structure

```
XO/
├── backend/
│   ├── public/
│   │   └── index.html    # Game UI
│   ├── index.js          # Server with Socket.io
│   └── package.json
└── README.md
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Socket.io** - Real-time communication
- **HTML/CSS/JavaScript** - Frontend

## License

ISC

