const express = require('express');
const expressApp = express();
const httpServer = require('http').createServer(expressApp);


const io = require('socket.io')(httpServer, {
    cors: { origin: true }
})

const port = process.env.PORT || 5000;


httpServer.listen(port, () => {
    console.log('Server running at', port)
})

io.on('connection', (socket) => {
    console.log('user online')
    socket.on('image-data', (data) => {
        
        socket.broadcast.emit('image-data', data)
    })
})
