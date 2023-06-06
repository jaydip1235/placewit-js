const chat = (io) => {
  /* This code is a middleware function that is executed every time a new socket connection is
  established. It extracts the username from the authentication data sent by the client during the
  handshake process and assigns it to the socket object. If the username is not provided or invalid,
  it throws an error and prevents the socket connection from being established. The `next()`
  function is called to pass control to the next middleware function in the stack. */
  io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    console.log(username);
    if (!username) {
      return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
  });



  io.on("connection", (socket) => {
    let users = [];

    for (let [id, socket] of io.of("/").sockets) {
      const existingUser = users.find((u) => u.username === socket.username);
      if (existingUser) {
        socket.emit("username taken");
        socket.disconnect();
        return;
      } else {
        users.push({
          userID: id,
          username: socket.username,
        });
      }
    }

    socket.emit("users", users);

    
    socket.broadcast.emit("user connected", {
      userID: socket.id,
      username: socket.username,
    });


    socket.on("message", (data) => {
      // mongodb logic
      io.emit("message", data);
    });


    socket.on("typing", (username) => {
      socket.broadcast.emit("typing", `${username} is typing...`);
    });
  
    socket.on("private message", ({ mm, to }) => {
      socket.to(to).emit("private message", {
        mm,
        from: socket.id,
      });
    });

    // disconnect
    socket.on("disconnect", () => {
      // console.log("user disconnected");
      socket.broadcast.emit("user disconnected", socket.id);
    });
  });


};

module.exports = chat