const express = require('express');
const router = express.Router();

//lib
const Messages = require('../src/lib/Messages');

router.get('/list', (req, res, next) =>{
    //Loading yazısını görebilme testi için
    /*setTimeout(()=>{
        Messages.list(req.query.roomId, messages =>{
            res.json(messages);
        });
    },3000)*/

    Messages.list(req.query.roomId, messages =>{
        res.json(messages);
    });
});

module.exports = router;

