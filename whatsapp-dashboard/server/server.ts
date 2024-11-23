import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { Client, LocalAuth } from 'whatsapp-web.js';
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// WhatsApp client instance
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox']
  }
});

// Connection handling
io.on('connection', (socket) => {
  console.log('Client connected');

  // Send current connection state
  socket.emit('connection-state', client.info ? 'connected' : 'disconnected');

  // Handle QR code events
  client.on('qr', (qr) => {
    console.log('QR Code received');
    socket.emit('qr', qr);
  });

  // Handle ready event
  client.on('ready', () => {
    console.log('WhatsApp client is ready');
    socket.emit('ready');
    socket.emit('connection-state', 'connected');
  });

  // Handle authenticated event
  client.on('authenticated', () => {
    console.log('WhatsApp client authenticated');
    socket.emit('authenticated');
    socket.emit('connection-state', 'connected');
  });

  // Handle disconnected event
  client.on('disconnected', () => {
    console.log('WhatsApp client disconnected');
    socket.emit('connection-state', 'disconnected');
  });

  // Handle message events
  client.on('message', async (msg) => {
    socket.emit('message', {
      from: msg.from,
      body: msg.body,
      timestamp: msg.timestamp
    });
  });

  // Handle client disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Initialize WhatsApp client
client.initialize()
  .then(() => {
    console.log('WhatsApp client initialized');
  })
  .catch((error) => {
    console.error('Failed to initialize WhatsApp client:', error);
  });

// Start server with port fallback
const DEFAULT_PORT = 3002;
const port = typeof process.env.PORT === 'string' ? parseInt(process.env.PORT, 10) : DEFAULT_PORT;

server.listen(port)
  .on('listening', () => {
    console.log(`Server running on port ${port}`);
  })
  .on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      console.log(`Port ${port} is in use, trying ${nextPort}`);
      server.listen(nextPort);
    } else {
      console.error('Server error:', error);
    }
  });
