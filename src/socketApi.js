const socketio = require('socket.io');
//const socketAuthorization = require('../middleware/socketAuthorization');
const io = socketio();

const socketApi = {
    io
};

io.on('connection',socket =>{
    console.log('a user logged in');
});

module.exports = socketApi;