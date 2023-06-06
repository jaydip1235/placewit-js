 # Socket.IO
 ## Socket.IO is a JavaScript library that enables real-time, bidirectional and event-based communication between the browser/client and the server.

    ● Real-time: Real-time communication refers to the ability to transmit and receive information with very little latency. This means that changes or actions performed in one place are seen almost instantly in another place, regardless of where the two locations are.

    ● Bidirectional: Bidirectional communication means that data can be sent and received in both directions between clients and servers. This differs from traditional HTTP requests where communication is initiated by the client and the server responds. In a bidirectional system like Socket.IO, both the client and the server can initiate communication, allowing them to send and receive data at will.

    ● Event-based: Event-based communication means that actions or data are packaged as "events" which can be emitted by one party and listened for by another. This is the foundation of Socket.IO's communication model. When an event is emitted, it's sent over the network to the other party (either the client or the server), which can have functions set up to respond to these events.
## 1- io.on:
io.on is a function that initializes a listener for certain events. The most common event is 'connection', which listens for any new connections to the server.

```
io.on('connection', (socket) => {
  console.log('A user connected');
});
```
In this code, the server listens for a 'connection' event, and when it occurs, it runs the provided function, which logs a message to the console.

## 2. io.emit:
io.emit is a function that emits events to all connected clients. This function is used when you want to send data to all clients.

```
io.emit('chat message', 'Hello everyone!');
```
In this code, a 'chat message' event is emitted to all connected clients with the data 'Hello everyone!'.

## 3. socket.emit:
socket.emit is a function that emits an event to a specific client. This function is used when you want to send data to one specific client. 
```
socket.emit('chat message', 'Hello!');
```
In this code, a 'chat message' event is emitted to a specific client with the data 'Hello!'.

## 4. socket.on:
socket.on is a function that initializes a listener for certain events for a specific client. 
```
socket.on('chat message', (msg) => {
  console.log('message: ' + msg);
});
```
In this code, the server listens for a 'chat message' event from a specific client, and when it occurs, it runs the provided function, which logs a message to the console.

## 5. io.use:
io.use is a function that registers a middleware, which is a function that gets executed for every incoming Socket, and can be used for things like authentication or logging. :
```
io.use((socket, next) => {
  if (isValid(socket.request)) {
    next();
  } else {
    next(new Error('Authentication error'));
  }
});
```
In this code, a middleware function is registered that checks if the request is valid. If it is, it calls next() to move on to the next middleware function or the connection event. If it is not valid, it calls next() with an error.

# In summary:

    io.on: listens for global events.

    io.emit: sends data to all clients.

    socket.emit: sends data to a specific client.

    socket.on: listens for events from a specific client.

    io.use: registers a middleware function to be run on every incoming Socket.