const http            = require('http')
const express         = require('express')
const session         = require('express-session')
const passport        = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy;
const bodyParser      = require('body-parser')
const morgan          = require('morgan')
const cors            = require('cors')
const app             = module.exports = express()
const server          = http.createServer(app)
const port            = parseInt(process.env.PORT || 3000)
const devMode         = process.env.NODE_ENV !== 'production'
require('dotenv').config()

const users = []

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_PUBLIC,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    console.log('AUTH HANDLED:', arguments)
    let user = users.find(u => u.id === profile.id)
    if (!user) {
      users.push({id: profile.id, username: profile.username})
    }
    done(null, user)
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
  }
));

passport.serializeUser(function(user, done) {
  console.log('serializeUser: ' + user._id)
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserializeUser: ' + user._id)
  let user = users.find(u => u.id === id)
  if (!user) { done(new Error('User not found! ' + id))}
  done(null, user)
});


app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan(devMode ? 'dev' : 'combined'))
app.use(cors({origin: true}))
app.use(session({
  secret: 'bquyqueajhbd',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize())
app.use(passport.session())


app.get('/', (req, res, next) => {
  console.log('session:', req.session)
  res.render('index', {user: req.user})
})

app.get('/login', (req, res, next) => {
  console.log('session:', req.session)
  res.render('index', {user: req.user})
})


// TODO: ADD (MOUNT) YOUR MIDDLEWARE (ROUTES) HERE
// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
app.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));

// ^^^ Example: app.use('/v1/kitten', require('./routes/kitten'))
// ^^^ Example: app.use('/cats', require('./routes/kitten'))

app.use(notFound)
app.use(errorHandler)

server.listen(port)
  .on('error',     console.error.bind(console))
  .on('listening', console.log.bind(console, 'Listening on ' + port));

function notFound(req, res, next) {
  const url = req.originalUrl
  if (!/favicon\.ico$/.test(url) && !/robots\.txt$/.test(url)) {
    // Don't log less important auto requests
    console.error('[404: Requested file not found] ', url)
  }
  res.status(404).send({error: 'Url not found', status: 404, url})
}

function errorHandler(err, req, res, next) {
  console.error('ERROR', err)
  const stack =  devMode ? err.stack : undefined
  res.status(500).send({error: err.message, stack, url: req.originalUrl})
}
