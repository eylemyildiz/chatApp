const express = require('express');
const router = express.Router();
const passportGoogle = require('../auth/google');

//Login with Google butonuna basıldığında çalışacak kısım
router.get('/google', passportGoogle.authenticate(
    'google',
    {
        scope: ['profile']  //googleile login olacak kişiden hangi bilgileri istiyorsak bu alan yazabiliriz.
    }
));


//Google'dan ilgili kullanıcı döndüğünde yani callback olduğunda
router.get('/google/callback', passportGoogle.authenticate(
    'google',
    {
        failureRedirect: '/'  //index'e yönleniriyoruz fail ettiğinde login olduğu yer orası diye yapmış anlatan.
    }),
    (req,res)=>{
        //login işleminin başarılı olması durumda çalışır
        res.redirect('/chat');
    }
);

module.exports = router;