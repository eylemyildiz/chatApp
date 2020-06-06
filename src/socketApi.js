const socketio = require('socket.io');
const socketAuthorization = require('../middleware/socketAuthorization');
const io = socketio();

const socketApi = {
    io
};

//libs
const Users = require('./lib/Users.js');
const Rooms = require('./lib/Rooms.js');
const Messages = require('./lib/Messages.js');

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

    //redis'e bilgileriyle kulanıcı ekleme
    Users.upsert(socket.id,socket.request.user);

    Users.list(users=>{
       // console.log(users);
        //tüm kullanıcıları bilgilendirme
        io.emit('onlineList',users);
    });


    //Redis'te ui'dan random olarak gelen roomName ile new room olusturma
    socket.on('newMessage',data =>{
        //console.log(data);
        Messages.upsert({
            ...data,
            userId: socket.request.user._id,
            username: socket.request.user.name,
            surname: socket.request.user.surname
        });
    });


    //Redis'te ui'dan random olarak gelen roomName ile new room olusturma
    socket.on('newRoom',roomName =>{
        Rooms.upsert(roomName);
        //Redis'te yer alan rooms'ları listeleme
        Rooms.list(rooms=>{
            console.log(rooms);
            //tüm kullanıcıları bilgilendirme
            io.emit('roomList',rooms);
        });
    });

    //Redis'te yer alan rooms'ları listeleme
    Rooms.list(rooms=>{
         console.log(rooms);
        //tüm kullanıcıları bilgilendirme
        io.emit('roomList',rooms);
    });

    //redis'ten kullanıcı bilgisini silme
    socket.on('disconnect',()=>{
        Users.remove(socket.request.user._id);

        Users.list(users=>{
           // console.log(users);
            //bir kullanıcı çıktığında online listesini güncelleiyoruz.
            io.emit('onlineList',users);
        });
    });
});

module.exports = socketApi;