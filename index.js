const express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	passport = require('passport'),
	bodyParser = require('body-parser'),
	LocalStrategy = require('passport-local'),
	passportLocalMongoose = require('passport-local-mongoose'),
	flash = require('connect-flash'),
	User = require('./models/user'),
	Post = require('./models/post'),
	Resp = require('./models/response');

const authRoutes = require('./routes/auth'),
	usersRoutes = require('./routes/users'),
	adminRoutes = require('./routes/admin');

// Configuração mongoose:
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/ediph');

// Configuração router
app.use(flash());
app.use(express.static('public'));
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.set('view engine', 'ejs');
app.use(
	require('express-session')({
		secret: 'secretIgorTheodoro',
		resave: false,
		saveUninitialized: false
	})
);

// Configuração do passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Usando rotas
app.use(authRoutes);
app.use(usersRoutes);
app.use(adminRoutes);

// Rota para home
app.get('/', function(req, res) {
	res.render('home', { messages: req.flash('error') });
});

// Rota não existente
app.get('*', function(req, res) {
	res.redirect('/');
});

//Listen
app.listen(process.env.PORT || 5000, function() {
	console.log('Servidor iniciado!');
});
