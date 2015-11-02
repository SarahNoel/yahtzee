var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('users');
var passport = require('passport');
var local = require('passport-local');

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../client', 'index.html'));
});

//register user
router.post('/register', function(req, res) {
  var password = req.body.password;
  User.register(new User({ username: req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({err: err});
    }
    passport.authenticate('local')(req, res, function () {
      var user = req.session.passport.user;
      return res.status(200).json({status: "Registration successful!", user:user});
    });
  });
});


//user login
router.post('/login', function(req, res, next) {
   passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      req.session.user = user;
      res.status(200).json({
        status: 'Login successful!',
        user: user
      });
    });
  })(req, res, next);
});

//user logout
router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Logged out.'});
});






module.exports = router;
