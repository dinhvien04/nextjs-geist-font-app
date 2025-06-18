const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:8000',
    methods: ['GET', 'POST']
  }
});

// Store online users
const onlineUsers = new Map();

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle user joining
  socket.on('user join', async (userId) => {
    onlineUsers.set(socket.id, userId);
    
    // Broadcast online users list
    const onlineUserIds = Array.from(new Set(onlineUsers.values()));
    io.emit('online users', onlineUserIds);
  });

  // Handle new messages
  socket.on('chat message', async (message) => {
    try {
      io.emit('chat message', {
        ...message,
        socketId: socket.id
      });
    } catch (error) {
      socket.emit('error', error.message);
    }
  });

  // Handle typing status
  socket.on('typing', (data) => {
    socket.broadcast.emit('user typing', {
      userId: onlineUsers.get(socket.id),
      isTyping: data.isTyping
    });
  });

  // Handle voice recording status
  socket.on('recording', (data) => {
    socket.broadcast.emit('user recording', {
      userId: onlineUsers.get(socket.id),
      isRecording: data.isRecording
    });
  });

  // Handle message deletion
  socket.on('delete message', (messageId) => {
    io.emit('message deleted', messageId);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const userId = onlineUsers.get(socket.id);
    onlineUsers.delete(socket.id);
    
    // Broadcast updated online users list
    const onlineUserIds = Array.from(new Set(onlineUsers.values()));
    io.emit('online users', onlineUserIds);
    
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Make io accessible to routes
app.set('io', io);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
