const express = require('express'),
  router = express.Router(),
  User = require('../models/user'),
  passport = require('passport');

//Rotas de login
router.get('/login', function (req, res) {
  res.render('login', {
    messages: req.flash('error')
  });
});

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
    failureFlash: 'E-mail ou senha inválidos.'
  }),
  function (req, res) {
    var email = req.body.username;

    User.find({
        username: email
      },
      function (err, user) {
        if (err) {
          res.redirect('/login');
        }
        res.redirect('/' + user[0]._id);
      }
    );
  }
);
//Rota de registro
router.post('/', function (req, res) { // Faz o middleware, que faz um find para ver se o email existe
  var email = req.body.username;
  var pass = req.body.password;
  var nome = req.body.nome;

  User.register(
    new User({
      username: email,
      nome: nome,
      active: false
    }),
    pass,
    function (err, user) {
      if (err) {
        res.redirect('/');
      }
      passport.authenticate('local')(req, res, function () {
        User.find({
            username: email
          },
          function (err, usuario) {
            console.log(usuario[0]._id);
            res.redirect('/' + usuario[0]._id);
          }
        );
      });
    }
  );
});



//Rota Lougout
router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/');

})

module.exports = router;