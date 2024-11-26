const express = require('express');
const http = require('http');
const WebSocket = require('ws'); // Import the WebSocket module

const app = express();
const server = http.createServer(app); // Create HTTP server

// Serve index.html on the root route
app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname });
});

// Start the server
server.listen(3000, function () {
    console.log('Welcome to Mero-Link');
});

// Create a WebSocket server
const wss = new WebSocket.Server({ server }); // Attach WebSocket server to HTTP server

// Listen for WebSocket connections
wss.on('connection', function connection(ws) {
    const numClients = wss.clients.size;
    console.log('Client connected:', numClients);

    // Broadcast the number of connected clients
    wss.broadcast(`Current visitors: ${numClients}`);

    // Send a welcome message to the connected client
    if (ws.readyState === WebSocket.OPEN) {
        ws.send('Welcome to Mero-Link');
    }

    // Handle client disconnection
    ws.on('close', function close() {
        console.log('Client disconnected');
        const numClients = wss.clients.size;
        wss.broadcast(`Current visitors: ${numClients}`);
    });
});

// Define a broadcast method for the WebSocket server
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};
