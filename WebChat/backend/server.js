const express = require('express');
const cors = require('cors')
const chat = require('./controllers/chat')
const app = express();




app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));




const port = process.env.PORT || 8000;
const server =app.listen(port, () => console.log(`Server running on port ${port}`));

const io = require('socket.io')(server,{
    cors : {
        origin : ['http://localhost:3000'],
        methods : ["GET","POST"]
    }
});

chat(io);
