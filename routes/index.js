var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

router.post('/', passport.authenticate('local', //'local' connects to 'local' in user-local.js
  {
    successRedirect: '/views/user.html',
    failureRedirect: '/views/failure.html'
  }
));

router.get('/', function ( req,res ){
  res.sendFile(path.resolve('public/views/index.html'));
});

module.exports = router;
