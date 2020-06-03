const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

//models
const User = require('../models/users');

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_LOGIN_CLIENT_ID,
        clientSecret: process.env.GOOGLE_LOGIN_SECRET_ID,
        callbackURL: process.env.GOOGLE_LOGIN_CALLBACK_URL
    },
    ((accessToken, refreshToken, profile, done)=>{
        const data = profile._json;
        //console.log(data);
        //user'ı veritabanına kaydetmek için id googleId'li hesabın olup olmadığını kontrol ediyoruz.
        //Kullanıcı yoksa yaratılacak
        User.findOrCreate(
            {
                'googleId':data.sub
            },
            {
                name: data.given_name,
                surname: data.family_name,
                profilePhotoUrl: data.picture +'0'
            },
            (err,user) =>{
                return done(err,user); //passport'un sağladığı birşey. İş bitince done çalışır.
            }
        );
    })
));

//dönen user'ın session'a atanması için
passport.serializeUser((user,done)=>{
    done(null,user);
});

//uygulamanın herhangi bri yerinde session datasını değiştirmek istersek diye gerekli
passport.deserializeUser((user,done)=>{
    done(null,user);
});
module.exports = passport;