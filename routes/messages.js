const express = require('express');
const router = express.Router();

//lib
const Messages = require('../src/lib/Messages');

router.get('/list', (req, res, next) =>{
    Messages.list('@Room:X6rovHGRy', messages =>{
        res.json(messages);
    });
});

module.exports = router;

