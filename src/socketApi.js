const socketio = require('socket.io');
const socketAuthorization = require('../middleware/socketAuthorization');
const io = socketio();

const socketApi = {
    io
};

//libs
const Users = require('./lib/Users.js');

//Socket Authorization
//Her socket bağlantısı çalıştırılmak kullanılmak istendiğinde arada bu middleware olaccak ve
//her işlem bu ara katmandan geçtikten sonra sonuçlandırılacak
/*io.use(()=>{
    console.log('selam');
});*/
io.use(socketAuthorization);


/**
 *
 * Redis adapter
 */
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT
}));



io.on('connection',socket =>{
    console.log('a user logged in'+ socket.request.user.surname);

   //socket.broadcast.emit('hello');

    Users.upsert(socket.id,socket.request.user);

    socket.on('disconnect',()=>{
        Users.remove(socket.request.user.googleId);
    });
});

module.exports = socketApi;