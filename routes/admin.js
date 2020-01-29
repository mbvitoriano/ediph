const express = require('express'),
      router = express.Router(),
      User = require('../models/user'),
      Post = require('../models/post'),
      Resp = require('../models/response'),
      passport = require('passport');

router.get('/admin/dash', function (req, res) {
  res.render('adm')
})

router.post('/admin/dash',
  passport.authenticate('local', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    var email = req.body.username;
    User.find({
        username: email
      },
      function (err, user) {
        if (err) {
          console.log(err);
          res.redirect('/login');
        } else {
          res.redirect('/admin/dash/' + user[0]._id);
        }
      }
    )
  });


router.get('/admin/dash/:id', isAdm, function (req, res) {
  Post.find({}, function (err, posts) {
    res.render('admpanel', {
      posts: posts
    });
  })
})

//Função rota administração
function isAdm(req, res, next) {
  User.find({
    username: 'igortheodoro12@gmail.com'
  }, function (err, usuario) {
    if (req.isAuthenticated() && req.params.id == usuario[0]._id) {
      if (req.params.id == req.user._id) {
        return next();
      } else {
        res.redirect('/')
      }
    } else {
      res.redirect('/login');
    }
  })
}
// Atualizar o banco de dados com respostas das edições
router.post('/admin/dash/:id/response', function (req, res) {
  var id = req.params.id;

  User.findById(id, function (err, user) {
    if (err) {
      res.redirect('/')
    } else {
      Resp.create({
        link: req.body.urlResponse,
        author: 'Igor Oliveira',
        text: 'Olá, aqui está sua imagem editada. Espero que goste e agradeço por usar a plataforma.'
      }, function (err, created) {
        if (err) {
          console.log(err)
        } else {
          user.responses.push(created)
          user.save()
          res.redirect('/admin/dash/' + req.user._id)
        }
      })
    }
  })
})

module.exports = router;