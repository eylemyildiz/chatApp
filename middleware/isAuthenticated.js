function isAuthenticated(req,res,next){
    //login olunduğunda passporjs aracılığı ile bu passportjs'in middleware'ları request nesnesine isAuthenticated fonksyionu atar.
    //Bu fonksiyon aracılığı ile login işlemi gereçkelşmiş mi gerçekleşmemiş mi onu anlıyoruz.True gelirse Ona göre authenticate olursa bir sonraki
    //sayfaya yönlendiriyoruz. Authenticate değilse giriş sayfasına yönlendiriyoruz.
    if(req.isAuthenticated())
        next();
    else
        res.redirect('/');
}

module.exports = isAuthenticated;