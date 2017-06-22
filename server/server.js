const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

//console.log(__dirname + '../public'); gives different path, hence use path.join() as shown below
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat App!',
        createdAt: 123123
    });

     socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined!',
        createdAt: 123123
    });
     

    // socket.emit('newMessage', {
    //     from: 'gymjohn',
    //     text: 'Hey! why so serious?',
    //     createdAt: 123123
    // });

    socket.on('createMessage', (message) => {
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});


app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});

//below code not needed, once public/index.html file 
//is exposed via middleware using ||const publicPath = path.join(__dirname, '../public');||,
//we dont need to render it specifically
// app.get('/', (req, res) => {
//     res.render('index.html');
// });
