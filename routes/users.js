const express = require('express'),
      router = express.Router(),
      Post = require('../models/post'),
      User = require('../models/user');

// Página do usuário
router.get('/:id', isLoggedIn, function (req, res) {
  var id = req.params.id
  User.findById(id).populate('posts').populate('responses').exec(function (err, user) {
    console.log(user.responses[0])
    res.render('user', {
      user: user
    });
  });

});
// Post da imagem e descrição na página do usuário
router.post('/:id', function (req, res) {
  var id = req.params.id

  var img = req.body.imageDone
  var desc = req.body.descEdit

  User.findById(id, function (err, user) {
    if (err) {
      console.log(err)
    } else {
      Post.create({
        image: img,
        descricao: desc
      }, function (err, post) {
        if (err) {
          console.log(err)
        } else {
          editActive(user) //Nega as edições do usuário

          user.posts.push(post)
          post.userID.push(user)

          post.save()
          user.save()

          res.redirect('/' + id)
        }
      })
    }
  })
})


// Função para verificar se o usuário está logado e esta entrando na page com seu id
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated() && req.user._id == req.params.id) {
    return next();
  } else {
    res.redirect('/login');
  }
}

// Função para negar a atividade de edições
function editActive(user) {
  user.active = !user.active
}

module.exports = router;