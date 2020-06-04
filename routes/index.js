const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) =>{
  //Kullanıcı login olduktan sonra sayfayı index syafasına geldiğinde chat'e yönlendrisin.
  if(!req.user)
    res.render('index', { title: 'Express' });
  else
    res.redirect('/chat');
});

module.exports = router;

