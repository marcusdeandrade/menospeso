import { Client } from 'whatsapp-web.js';
import { Server } from 'socket.io';
import express from 'express';
import http from 'http';
import cors from 'cors';

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Initialize WhatsApp client
const client = new Client({
  authStrategy: new (require('whatsapp-web.js')).LocalAuth(),
  puppeteer: {
    headless: true,
    executablePath: '/usr/bin/google-chrome-stable',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ]
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Frontend connected');

  // Send current client state
  socket.emit('status', client.info ? 'CONNECTED' : 'DISCONNECTED');

  // Handle reconnect requests
  socket.on('reconnect', () => {
    console.log('Reconnecting WhatsApp...');
    client.initialize();
  });
});

// WhatsApp client event handlers
client.on('qr', (qr) => {
  console.log('QR Code received');
  io.emit('qr', qr);
  io.emit('status', 'CONNECTING');
});

client.on('ready', () => {
  console.log('WhatsApp client is ready!');
  io.emit('status', 'CONNECTED');
});

client.on('authenticated', () => {
  console.log('WhatsApp client is authenticated!');
  io.emit('status', 'CONNECTED');
});

client.on('auth_failure', () => {
  console.log('Auth failed!');
  io.emit('status', 'DISCONNECTED');
});

client.on('disconnected', (reason) => {
  console.log('WhatsApp client was disconnected', reason);
  io.emit('status', 'DISCONNECTED');
});

// Initialize WhatsApp client
client.initialize().catch(err => {
  console.error('Failed to initialize WhatsApp client:', err);
  io.emit('status', 'DISCONNECTED');
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});
