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

### Option 1: Heroku

1. **Install Heroku CLI** and login
2. **Create a `Procfile` in the backend folder:**
   ```
   web: node index.js
   ```
3. **Set the port in your code** (already done - uses `process.env.PORT`)
4. **Deploy:**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   heroku create your-app-name
   git push heroku main
   ```

### Option 2: Railway

1. **Connect your GitHub repo** to Railway
2. **Set root directory** to `backend`
3. **Set start command** to `node index.js`
4. **Deploy automatically**

### Option 3: Render

1. **Create a new Web Service** on Render
2. **Connect your repository**
3. **Set build command:** `npm install`
4. **Set start command:** `node index.js`
5. **Set root directory:** `backend`

### Option 4: VPS (DigitalOcean, AWS, etc.)

1. **SSH into your server**
2. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
3. **Clone your repository**
4. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```
5. **Use PM2 to keep it running:**
   ```bash
   npm install -g pm2
   pm2 start index.js --name xo-game
   pm2 save
   pm2 startup
   ```
6. **Set up Nginx** as a reverse proxy (optional but recommended)

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

